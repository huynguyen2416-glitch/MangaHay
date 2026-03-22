<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Kiểm tra nếu chưa đăng nhập thì đuổi về trang chủ
        if (!Auth::check()) {
            return redirect('/');
        }

        // 2. Kiểm tra nếu đã đăng nhập nhưng KHÔNG PHẢI Admin (id = 1) thì cũng đuổi về
        if (Auth::user()->id !== 1) {
            return redirect('/');
        }

        // 3. Đúng là Admin thì cho đi tiếp
        return $next($request);
    }
}