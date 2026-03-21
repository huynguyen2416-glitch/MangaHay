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
        // Có thể lọc chapter theo id_manga nếu truyền url: /admin/chap?manga_id=1
        $query = Chap::with('truyen')->orderBy('id', 'desc');
        
        if ($request->has('manga_id')) {
            $query->where('id_manga', $request->manga_id);
        }

        return Inertia::render('Admin/Chap/Index', [
            'chaps' => $query->paginate(15)
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
        $request->validate([
            'id_manga' => 'required',
            'ten_chap' => 'required',
            'so_chuong' => 'required',
            'noi_dung' => 'required|array',
        ]);

        $data = $request->all();

        // 1. ĐỔI TÊN CỘT: Dịch 'ten_chap' từ form sang 'tieu_de' cho Database hiểu
        $data['tieu_de'] = $request->ten_chap;
        unset($data['ten_chap']); // Xóa key cũ để tránh lỗi

        // 2. ĐỔI TÊN CỘT ẢNH: Dịch 'noi_dung' sang 'danh_sach_anh'
        if ($request->hasFile('noi_dung')) {
            $files = $request->file('noi_dung');
            usort($files, function($a, $b) {
                return strnatcasecmp($a->getClientOriginalName(), $b->getClientOriginalName());
            });
            $imagePaths = [];
            $folderPath = 'images/chaps/' . $request->id_manga;
            
            if (!File::exists(public_path($folderPath))) {
                File::makeDirectory(public_path($folderPath), 0755, true);
            }

            foreach ($request->file('noi_dung') as $key => $file) {
                $extension = $file->getClientOriginalExtension();
                $thutu = sprintf('%03d', $key);
                $filename = time() . '_' . $request->id_manga . '_chap-' . $request->so_chuong . '_trang-' . $thutu  . '.' . $extension;
                
                $file->move(public_path($folderPath), $filename);
                $imagePaths[] = '/' . $folderPath . '/' . $filename;
            }
            // Lưu vào đúng cột 'danh_sach_anh'
            $data['danh_sach_anh'] = json_encode($imagePaths); 
            unset($data['noi_dung']); 
        }

        Chap::create($data);
        return redirect()->route('admin.chap.index');
    }

    public function update(Request $request, Chap $chap)
    {
        $data = $request->all();

        // 1. ĐỔI TÊN CỘT: Dịch 'ten_chap' sang 'tieu_de'
        if (isset($data['ten_chap'])) {
            $data['tieu_de'] = $data['ten_chap'];
            unset($data['ten_chap']);
        }

        // 2. ĐỔI TÊN CỘT ẢNH
        if ($request->hasFile('noi_dung')) {
            $files = $request->file('noi_dung');
            usort($files, function($a, $b) {
                return strnatcasecmp($a->getClientOriginalName(), $b->getClientOriginalName());
            });
            $oldImages = json_decode($chap->danh_sach_anh, true);
            if (is_array($oldImages)) {
                foreach ($oldImages as $oldImg) {
                    if (File::exists(public_path($oldImg))) {
                        File::delete(public_path($oldImg));
                    }
                }
            }

            // Lưu ảnh mới
            $imagePaths = [];
            $folderPath = 'images/chaps/' . $request->id_manga;
            
            if (!File::exists(public_path($folderPath))) {
                File::makeDirectory(public_path($folderPath), 0755, true);
            }

            foreach ($request->file('noi_dung') as $key => $file) {
                $extension = $file->getClientOriginalExtension();
                $thutu = sprintf('%03d', $key);
                $filename = time() . '_' . $request->id_manga . '_chap-' . $request->so_chuong . '_trang-' . $thutu . '.' . $extension;
                $file->move(public_path($folderPath), $filename);
                $imagePaths[] = '/' . $folderPath . '/' . $filename;
            }
            // Cập nhật đường dẫn mới vào cột 'danh_sach_anh'
            $data['danh_sach_anh'] = json_encode($imagePaths); 
        } 
        
        // Dù có up ảnh hay không thì vẫn phải xóa key 'noi_dung' vì DB không có cột này
        unset($data['noi_dung']); 

        $chap->update($data);
        return redirect()->route('admin.chap.index');
    }
}