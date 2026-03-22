<?php
namespace App\Http\Controllers\Client;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen; 
use App\Models\Chap;   
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

        return Inertia::render('Client/Manga/truyen', [
            'manga' => $manga,
            'chapters' => $chapters
        ]);
    }
}