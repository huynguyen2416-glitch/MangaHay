<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Xử lý lưu bình luận mới
     */
    public function store(Request $request, $id_manga)
    {
        // 1. Kiểm tra dữ liệu đầu vào
        $request->validate([
            'noi_dung' => 'required|string|max:1000',
            'id_chap' => 'nullable|integer', // Có thể null nếu bình luận ở ngoài truyện
            'parent_id' => 'nullable|exists:binh_luan,id'
        ]);

        // 2. Lưu vào database sử dụng Eloquent Model
        Comment::create([
            'id_user' => Auth::id(),
            'id_manga' => $id_manga,
            'id_chap' => $request->id_chap,
            'parent_id' => $request->parent_id,
            'noi_dung' => $request->noi_dung,
        ]);

        // 3. Trả về trang cũ (Inertia sẽ tự động cập nhật mượt mà không reload)
        return back()->with('success', 'Đã gửi bình luận thành công!');
    }
}