<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen;
use App\Models\Chap;
use Inertia\Inertia;

class ChapController extends Controller
{
    // Hàm hiển thị trang đọc truyện
    public function show($id)
{
    $chapter = Chap::findOrFail($id);
    $manga = Truyen::findOrFail($chapter->id_manga);
    
    // Giả sử bạn lưu ảnh liên kết với chapter trong bảng images
    $images = $chapter->images()->orderBy('order', 'asc')->get();

    // Logic tìm chap trước / sau (Tuỳ cách bạn thiết kế database)
    $prevChapter = Chap::where('id_manga', $manga->id)->where('id', '<', $chapter->id)->orderBy('id', 'desc')->first();
    $nextChapter = Chap::where('id_manga', $manga->id)->where('id', '>', $chapter->id)->orderBy('id', 'asc')->first();

    return Inertia::render('Client/Reader', [
        'manga' => $manga,
        'chapter' => $chapter,
        'images' => $images,
        'prevUrl' => $prevChapter ? route('chapter.show', $prevChapter->id) : null,
        'nextUrl' => $nextChapter ? route('chapter.show', $nextChapter->id) : null,
    ]);
}
}