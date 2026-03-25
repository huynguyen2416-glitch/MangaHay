<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chap;
use App\Models\Truyen;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
class ChapController extends Controller
{
    public function index(Request $request)
{
    // 1. Khởi tạo query và lấy kèm dữ liệu truyện để hiển thị tên
    $query = Chap::with('truyen');

    // 2. Chức năng vàng: Lọc theo ID Truyện nếu có yêu cầu từ giao diện
    if ($request->filled('manga_id')) {
        $query->where('id_manga', $request->manga_id);
    }

    // 3. Phân trang

    $chaps = $query->orderBy('id', 'desc')->paginate(15)->withQueryString();

    // 4. Trả về Inertia
    return Inertia::render('Admin/Chap/Index', [
        'chaps' => $chaps,
        'filters' => $request->only(['manga_id'])
    ]);
}

    public function create()
    {
        // Lấy danh sách truyện để chọn khi tạo chap mới
        $truyens = Truyen::select('id', 'ten_truyen')->get();
        return Inertia::render('Admin/Chap/Create', [
            'truyens' => $truyens
        ]);
    }

    public function edit($id)
    {
        $chap = Chap::findOrFail($id);
        $truyens = Truyen::select('id', 'ten_truyen')->get();

        return Inertia::render('Admin/Chap/Edit', [
            'chap' => $chap,
            'truyens' => $truyens
        ]);
    }

    public function store(Request $request)
    {
        // Validate dữ liệu từ React gửi lên
        $request->validate([
            'id_manga' => 'required|exists:truyen,id',
            'tieu_de' => 'nullable|string|max:255', 
            'so_chuong' => 'required|integer',       
            'noi_dung' => 'required|array',          // Mảng ảnh
            'noi_dung.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120', 
        ]);

        $imagePaths = [];

        // Xử lý lưu ảnh
        if ($request->hasFile('noi_dung')) {
            $files = $request->file('noi_dung');
            $folderPath = 'images/chaps/truyen_' . $request->id_manga . '/chuong_' . $request->so_chuong;
            
            if (!File::exists(public_path($folderPath))) {
                File::makeDirectory(public_path($folderPath), 0755, true);
            }

            foreach ($files as $index => $file) {
                $pageNumber = sprintf('%03d', $index + 1); 
                $extension = $file->getClientOriginalExtension();
                $filename = 'trang_' . $pageNumber . '_' . time() . '.' . $extension;

                $file->move(public_path($folderPath), $filename);
                $imagePaths[] = '/' . $folderPath . '/' . $filename;
            }
        }

        // Lưu vào Database với tên cột CHUẨN XÁC
        Chap::create([
            'id_manga' => $request->id_manga,
            'so_chuong' => $request->so_chuong,
            'tieu_de' => $request->tieu_de, 
            'danh_sach_anh' => json_encode($imagePaths),
        ]);

        return redirect()->route('admin.chap.index')->with('success', 'Thêm chapter mới thành công!');
    }

    public function update(Request $request, string $id)
    {
        $chap = Chap::findOrFail($id);

        $request->validate([
            'id_manga' => 'required|exists:truyen,id',
            'tieu_de' => 'nullable|string|max:255',
            'so_chuong' => 'required|integer',
            'noi_dung' => 'required|array',
        ]);

        $folderPath = 'images/chaps/truyen_' . $request->id_manga . '/chuong_' . $request->so_chuong;
        if (!File::exists(public_path($folderPath))) {
            File::makeDirectory(public_path($folderPath), 0755, true);
        }

        $newImagePaths = [];
        $submittedOldUrls = []; 

        if ($request->has('noi_dung')) {
            foreach ($request->noi_dung as $index => $item) {
                $pageNumber = sprintf('%03d', $index + 1);

                // Nếu là file ảnh mới tải lên
                if (is_file($item) || $item instanceof \Illuminate\Http\UploadedFile) {
                    $extension = $item->getClientOriginalExtension();
                    $filename = 'trang_' . $pageNumber . '_' . time() . '.' . $extension;
                    $item->move(public_path($folderPath), $filename);
                    $newImagePaths[] = '/' . $folderPath . '/' . $filename;
                }
                // Nếu là link ảnh cũ
                else if (is_string($item)) {
                    $newImagePaths[] = $item; 
                    $submittedOldUrls[] = $item; 
                }
            }
        }

        // Xóa ảnh cũ khỏi ổ cứng nếu bị loại bỏ
        $oldDbImages = json_decode($chap->danh_sach_anh, true) ?? [];
        $imagesToDelete = array_diff($oldDbImages, $submittedOldUrls);

        foreach ($imagesToDelete as $oldImage) {
            $fullPath = public_path(ltrim($oldImage, '/'));
            if (File::exists($fullPath)) {
                File::delete($fullPath); 
            }
        }

        // Cập nhật Database
        $chap->update([
            'id_manga' => $request->id_manga,
            'so_chuong' => $request->so_chuong,
            'tieu_de' => $request->tieu_de, 
            'danh_sach_anh' => json_encode($newImagePaths),
        ]);

        return redirect()->route('admin.chap.index')->with('success', 'Cập nhật chapter thành công!');
    }
    public function destroy(string $id)
    {
        // 1. Tìm chương cần xoá
        $chap = Chap::findOrFail($id);

        // 2. Tìm và xoá thư mục vật lý chứa ảnh của chương này
        // Đường dẫn lúc mình lưu là: images/chaps/truyen_{id}/chuong_{so_chuong}
        $folderPath = 'images/chaps/truyen_' . $chap->id_manga . '/chuong_' . $chap->so_chuong;
        
        // Kiểm tra xem thư mục có tồn tại không, nếu có thì xoá toàn bộ thư mục và ruột bên trong
        if (File::exists(public_path($folderPath))) {
            File::deleteDirectory(public_path($folderPath));
        }

        // 3. Xoá dữ liệu trong Database
        $chap->delete();

        // 4. Quay lại trang danh sách và báo thành công
        return redirect()->route('admin.chap.index')->with('success', 'Đã xoá chương và toàn bộ ảnh thành công!');
    }
}