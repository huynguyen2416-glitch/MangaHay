<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen; 
use App\Models\Chap;   
use Inertia\Inertia;

class ChapController extends Controller
{
    public function show($id)
    {
        $chapter = Chap::findOrFail($id);
        $manga = Truyen::findOrFail($chapter->id_manga);

        // Lấy dữ liệu từ cột chứa ảnh (Giả sử cột của bạn tên là 'noi_dung')
        // Nếu tên cột của bạn khác (ví dụ: 'link_anh', 'images'), hãy thay 'noi_dung' bằng tên đó nhé.
        $imagesData = $chapter->noi_dung; 
        
        // Giải mã chuỗi JSON thành mảng. Nếu lỗi hoặc rỗng thì gán là mảng rỗng []
        $images = is_string($imagesData) ? json_decode($imagesData, true) : $imagesData;
        if (!is_array($images)) {
            $images = []; 
        }
        // ---------------------------

        // Tìm chương Trước / Sau
        $prevChapter = Chap::where('id_manga', $manga->id)
                            ->where('so_chuong', '<', $chapter->so_chuong)
                            ->orderBy('so_chuong', 'desc')
                            ->first();

        $nextChapter = Chap::where('id_manga', $manga->id)
                            ->where('so_chuong', '>', $chapter->so_chuong)
                            ->orderBy('so_chuong', 'asc')
                            ->first();

        return Inertia::render('Client/Manga/chap', [
            'manga' => $manga,
            'chapter' => $chapter,
            'images' => $images,
            'prevUrl' => $prevChapter ? route('client.chapter.show', $prevChapter->id) : null,
            'nextUrl' => $nextChapter ? route('client.chapter.show', $nextChapter->id) : null,
        ]);
    }
}