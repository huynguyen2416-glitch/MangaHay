<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // 1. Hiển thị danh sách User
    public function index()
    {
        // Lấy danh sách users kèm theo tên Role
        $users = User::join('roles', 'users.role_id', '=', 'roles.id')
                     ->select('users.*', 'roles.ten_vaitro as role_name')
                     ->orderBy('id', 'desc')
                     ->get();

        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    // 2. Hiển thị Form Thêm/Sửa (Gộp chung trả về 1 file Form.jsx)
    public function create()
    {
        $roles = DB::table('roles')->get(); // Lấy danh sách chức vụ để làm Dropdown
        return Inertia::render('Admin/User/Form', ['roles' => $roles]);
    }

    public function edit(User $user)
    {
        $roles = DB::table('roles')->get();
        return Inertia::render('Admin/User/Form', ['user' => $user, 'roles' => $roles]);
    }

    // 3. Xử lý lưu User mới vào DB
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role_id' => 'required|exists:roles,id',
            'sdt'        => 'nullable|string|max:15', 
            'so_du_coin' => 'nullable|integer|min:0',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'so_du_coin' => $request->so_du_coin ?? 0, // Mặc định 0 nếu không nhập
             'sdt' => $request->sdt ?? null, // Mặc định null nếu không nhập
        ]);

        return redirect()->route('admin.users.index')->with('success', 'Thêm người dùng thành công!');
    }

    // 4. Xử lý cập nhật User
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'role_id' => 'required|exists:roles,id',
            'sdt'        => 'nullable|string|max:15',
            'so_du_coin' => 'nullable|integer|min:0',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id,
            'so_du_coin' => $request->so_du_coin,  
            'sdt' => $request->sdt,
        ];

        // Chỉ cập nhật mật khẩu nếu Admin có nhập
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('admin.users.index')->with('success', 'Cập nhật thành công!');
    }

    // 5. Xóa User
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'Đã xóa người dùng!');
    }
}