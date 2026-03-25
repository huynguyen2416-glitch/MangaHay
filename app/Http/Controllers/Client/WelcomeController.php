<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen;
use Inertia\Inertia;

class WelcomeController extends Controller{
    public function index(){
        $manga = Truyen::with('latestChapter')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Client/Welcome', [
            'manga' => $manga,
        ]);
    }
}