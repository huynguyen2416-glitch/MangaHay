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


        $imagesData = $chapter->danh_sach_anh; 
        
        // Giải mã chuỗi JSON thành mảng. Nếu lỗi hoặc rỗng thì gán là mảng rỗng []
        $images = is_string($imagesData) ? json_decode($imagesData, true) : $imagesData;
        if (!is_array($images)) {
            $images = []; 
        }

        // Tìm chương Trước / Sau (Cũ hơn / Mới hơn)
        $prevChapter = Chap::where('id_manga', $manga->id)
                            ->where('so_chuong', '<', $chapter->so_chuong)
                            ->orderBy('so_chuong', 'desc')
                            ->first();

        $nextChapter = Chap::where('id_manga', $manga->id)
                            ->where('so_chuong', '>', $chapter->so_chuong)
                            ->orderBy('so_chuong', 'asc')
                            ->first();

        // LẤY THÊM: Danh sách các chương để làm Menu Dropdown (Xếp từ mới -> cũ)
   
        $danhSachChuong = Chap::where('id_manga', $manga->id)
                            ->orderBy('so_chuong', 'desc')
                            ->get(['id', 'so_chuong', 'tieu_de']);

        return Inertia::render('Client/Manga/chap', [
            'manga' => $manga,
            'chapter' => $chapter,
            'images' => $images,
            'prevUrl' => $prevChapter ? route('client.chapter.show', $prevChapter->id) : null,
            'nextUrl' => $nextChapter ? route('client.chapter.show', $nextChapter->id) : null,
            'danhSachChuong' => $danhSachChuong, // Gửi qua React
        ]);
    }
}