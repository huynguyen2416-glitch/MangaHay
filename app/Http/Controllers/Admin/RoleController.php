<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Hiển thị danh sách Vai trò (Roles)
     */
    public function index()
    {
        // Lấy tất cả vai trò từ bảng 'roles'
        $roles = DB::table('roles')->orderBy('id', 'asc')->get();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Hiển thị form Thêm Vai trò
     */
    public function create()
    {
        return Inertia::render('Admin/Roles/Create');
    }

    /**
     * Xử lý lưu Vai trò mới vào Database
     */
    public function store(Request $request)
    {
        // 1. Kiểm tra dữ liệu đầu vào theo đúng bảng 'roles'
        $request->validate([
            'ten_vaitro' => 'required|string|max:50|unique:roles,ten_vaitro',
            'trang_thai' => 'required|boolean', // 1 hoặc 0
        ], [
            'ten_vaitro.required' => 'Tên vai trò không được để trống.',
            'ten_vaitro.unique' => 'Tên vai trò này đã tồn tại trong hệ thống.',
            'ten_vaitro.max' => 'Tên vai trò không được vượt quá 50 ký tự.',
        ]);

        // 2. Lưu vào CSDL
        DB::table('roles')->insert([
            'ten_vaitro' => $request->ten_vaitro,
            'trang_thai' => $request->trang_thai ? 1 : 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('admin.roles.index')->with('success', 'Thêm vai trò thành công!');
    }

    /**
     * Hiển thị form Sửa Vai trò
     */
    public function edit($id)
    {
        $role = DB::table('roles')->where('id', $id)->first();

        if (!$role) {
            abort(404, 'Không tìm thấy vai trò này.');
        }

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role
        ]);
    }

    /**
     * Xử lý Cập nhật Vai trò
     */
    public function update(Request $request, $id)
    {
        // 1. Validation (Bỏ qua check unique cho chính ID đang sửa)
        $request->validate([
            'ten_vaitro' => 'required|string|max:50|unique:roles,ten_vaitro,' . $id,
            'trang_thai' => 'required|boolean',
        ], [
            'ten_vaitro.required' => 'Tên vai trò không được để trống.',
            'ten_vaitro.unique' => 'Tên vai trò này đã tồn tại.',
        ]);

        // 2. Chuẩn bị mảng dữ liệu cập nhật
        $updateData = [
            'trang_thai' => $request->trang_thai ? 1 : 0,
            'updated_at' => now(),
        ];

        // 3. BẢO MẬT: Nếu KHÔNG PHẢI là Admin (id=1) thì mới cho phép đổi tên
        if ($id != 1) {
            $updateData['ten_vaitro'] = $request->ten_vaitro;
        }

        // 4. Thực thi Update
        DB::table('roles')->where('id', $id)->update($updateData);

        return redirect()->route('admin.roles.index')->with('success', 'Cập nhật vai trò thành công!');
    }

    /**
     * Xử lý Xóa Vai trò
     */
    public function destroy($id)
    {
        // BẢO MẬT: Không cho phép xóa Admin (id=1) và Customer mặc định (id=2)
        if (in_array($id, [1, 2])) {
            return redirect()->back()->with('error', 'Hệ thống không cho phép xóa vai trò mặc định này!');
        }

        // Kiểm tra xem có user nào đang dùng role này ở bảng `users` không
        $userCount = DB::table('users')->where('role_id', $id)->count();
        if ($userCount > 0) {
            return redirect()->back()->with('error', 'Không thể xóa! Đang có ' . $userCount . ' người dùng giữ vai trò này.');
        }

        // Thực thi Xóa
        DB::table('roles')->where('id', $id)->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Đã xóa vai trò!');
    }
}