<?php
namespace App\Http\Controllers\Client;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen; 
use App\Models\Chap;
use App\Models\Comment;
use Inertia\Inertia;

class TruyenController extends Controller
{
    // Hàm hiển thị trang chi tiết truyện
    public function show($id)
    {
        $manga = Truyen::findOrFail($id); 
        $chapters = Chap::where('id_manga', $id) 
                        ->orderBy('id', 'desc')
                        ->get();
        $comments = Comment::with(['user:id,name', 'replies.user:id,name']) // Lấy user của comment gốc, user của comment con
                        ->where('id_manga', $id)
                        ->whereNull('id_chap') 
                        ->whereNull('parent_id') 
                        ->orderBy('created_at', 'desc')
                        ->paginate(10);

        return Inertia::render('Client/Manga/truyen', [
            'manga' => $manga,
            'chapters' => $chapters,
            'comments' => $comments,

        ]);
    }
}