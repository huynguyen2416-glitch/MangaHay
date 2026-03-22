<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    // Thêm tham số ...$roles để nhận danh sách các quyền từ file route
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Kiểm tra nếu chưa đăng nhập thì đuổi về trang chủ (hoặc trang login)
        if (!Auth::check()) {
            return redirect('/login');
        }

        // 2. Lấy role_id của người dùng hiện tại
        // (Lưu ý: Thay 'role_id' bằng đúng tên cột lưu quyền trong bảng users của bạn)
        $userRole = Auth::user()->role_id; 

        // 3. Kiểm tra xem role của user có nằm trong danh sách các role được phép không
        if (in_array($userRole, $roles)) {
            // Đúng quyền thì cho đi tiếp
            return $next($request);
        }

        // 4. Nếu đã đăng nhập nhưng không có quyền thì báo lỗi 403 (Hoặc đuổi về '/')
        abort(403, 'Bạn không có quyền truy cập trang này!');
        // Hoặc: return redirect('/')->with('error', 'Không có quyền truy cập');
    }
}