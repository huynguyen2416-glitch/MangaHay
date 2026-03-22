<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class TruyenController extends Controller
{
    // Hiển thị danh sách truyện
    public function index()
    {
        $truyens = Truyen::orderBy('id', 'desc')->paginate(10);
        return Inertia::render('Admin/Truyen/Index', [
            'truyens' => $truyens
        ]);
    }

    // Hiển thị form thêm truyện mới
    public function create()
    {
        return Inertia::render('Admin/Truyen/Create');
    }

    // Xử lý lưu truyện vào Database
    public function store(Request $request)
    {
        $request->validate([
            'ten_truyen' => 'required',
            'anh_bia' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'mo_ta' => 'nullable',
        ]);

        $anhBiaPath = null; // Khởi tạo biến rỗng trước

        // LƯU THẲNG VÀO THƯ MỤC PUBLIC/UPLOADS/TRUYENS
        if ($request->hasFile('anh_bia')) {
            $file = $request->file('anh_bia');
            // Tạo tên file ngẫu nhiên để không bị trùng
            $filename = time() . '_' . $file->getClientOriginalName();
            // Chuyển file vào thư mục public/uploads/truyens
            $file->move(public_path('uploads/truyens'), $filename);
            // Lưu đường dẫn vào biến
            $anhBiaPath = '/uploads/truyens/' . $filename; 
        }

        Truyen::create([
            'id_nguoidang' => Auth::id(),    // Lấy ID admin đang đăng nhập
            'ten_truyen' => $request->ten_truyen,
            'tac_gia' => $request->tac_gia,
            'mo_ta' => $request->mo_ta,      // Đảm bảo form React đang gửi biến mo_ta
            'anh_bia' => $anhBiaPath,        // Gọi đúng biến $anhBiaPath
            'trang_thai' => $request->trang_thai ?? 1
        ]);

        
        return redirect()->route('admin.truyen.index')->with('success', 'Thêm truyện thành công!');
    }

    // Hiển thị form sửa truyện
    public function edit($id)
    {
        $truyen = Truyen::findOrFail($id);
        return Inertia::render('Admin/Truyen/Edit', [
            'truyen' => $truyen
        ]);
    }

    // Xử lý cập nhật truyện
    public function update(Request $request, Truyen $truyen)
    {
        $data = $request->all();
        
        // KIỂM TRA: CÓ FILE MỚI ĐƯỢC TẢI LÊN KHÔNG?
        if ($request->hasFile('anh_bia')) {
            // Xóa ảnh cũ nếu có
            if ($truyen->anh_bia && File::exists(public_path($truyen->anh_bia))) {
                File::delete(public_path($truyen->anh_bia));
            }
            
            $file = $request->file('anh_bia');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '_' . Str::slug($request->ten_truyen) . '.' . $extension;
            
            // Đồng nhất lưu vào chung 1 thư mục uploads/truyens như lúc store
            $file->move(public_path('images/truyens'), $filename);
            $data['anh_bia'] = '/images/truyens/' . $filename;

        } else {
            unset($data['anh_bia']); 
        }

        // Tiến hành cập nhật vào Database
        $truyen->update($data);

        return redirect()->route('admin.truyen.index')->with('success', 'Cập nhật thành công!');
    }

    // Xử lý xóa truyện
    public function destroy($id)
    {
        $truyen = Truyen::findOrFail($id);
        
        // Xóa luôn file ảnh bìa trong thư mục cho nhẹ server
        if ($truyen->anh_bia && File::exists(public_path($truyen->anh_bia))) {
            File::delete(public_path($truyen->anh_bia));
        }
        
        $truyen->delete();
        
        return redirect()->route('admin.truyen.index')->with('success', 'Xóa truyện thành công!');
    }
}