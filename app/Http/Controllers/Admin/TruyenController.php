<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
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
            'tom_tat' => 'nullable',
        ]);

        $data = $request->all();

        // LƯU THẲNG VÀO THƯ MỤC PUBLIC/UPLOADS
        if ($request->hasFile('anh_bia')) {
            $file = $request->file('anh_bia');
            // Tạo tên file ngẫu nhiên để không bị trùng (vd: 1698765432_anhbia.jpg)
            $filename = time() . '_' . $file->getClientOriginalName();
            // Chuyển file vào thư mục public/uploads/truyens
            $file->move(public_path('uploads/truyens'), $filename);
            // Lưu đường dẫn vào DB
            $data['anh_bia'] = '/uploads/truyens/' . $filename; 
        }

        Truyen::create($data);
        return redirect()->route('admin.truyen.index');
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
    public function update(Request $request, Truyen $truyen){
    $data = $request->all();
    // KIỂM TRA: CÓ FILE MỚI ĐƯỢC TẢI LÊN KHÔNG?
    if ($request->hasFile('anh_bia')) {
        if ($truyen->anh_bia && File::exists(public_path($truyen->anh_bia))) {
            File::delete(public_path($truyen->anh_bia));
        }
        $file = $request->file('anh_bia');
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '_' . Str::slug($request->ten_truyen) . '.' . $extension;
        $file->move(public_path('images/truyens'), $filename);
        $data['anh_bia'] = '/images/truyens/' . $filename;

    } else {

        unset($data['anh_bia']); 
    }

    // Tiến hành cập nhật vào Database
    $truyen->update($data);

    return redirect()->route('admin.truyen.index');
}

    // Xử lý xóa truyện
    public function destroy($id)
    {
        Truyen::findOrFail($id)->delete();
        return redirect()->route('admin.truyen.index')->with('success', 'Xóa truyện thành công!');
    }
}