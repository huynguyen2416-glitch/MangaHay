<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $roleId): Response
    {
        // 1. Nếu chưa đăng nhập -> đuổi ra trang login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // 2. Nếu role_id của người dùng KHỚP với roleId yêu cầu ở Route -> cho đi tiếp
        if (Auth::user()->role_id == $roleId) {
            return $next($request);
        }

        // 3. Nếu đăng nhập rồi nhưng sai quyền -> Báo lỗi 404 (giả vờ trang không tồn tại)
        abort(404);
    }
}