<?php
use App\Http\Controllers\Client\TruyenController;
use App\Http\Controllers\Client\ChapController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TruyenController as AdminTruyenController;
use App\Http\Controllers\Admin\ChapController as AdminChapController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia;
use App\Http\Middleware\CheckRole;


// 1. ROUTE ĐỘC GIẢ 

Route::get('/', function () {
    // Lấy dữ liệu truyện từ Database
    $truyen = DB::table('truyen')->get(); 
    return Inertia::render('Client/Welcome', [
        'truyen' => $truyen
    ]);
})->name('home');
Route::group(['as' => 'client.'], function () {
    
    // Link xem chi tiết truyện: web.com/truyen/1
    Route::get('/truyen/{id}', [TruyenController::class, 'show'])->name('manga.show');
    
    // Link đọc truyện: web.com/chuong/15
    Route::get('/chuong/{id}', [ChapController::class, 'show'])->name('chapter.show');
    
});


// 2. ROUTE ADMIN

Route::prefix('admin')->name('admin.')->middleware(['auth', CheckRole::class])->group(function () {
    
    // Trang chủ Dashboard Admin
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard'); 
    })->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('truyen', AdminTruyenController::class);
    Route::resource('chap', AdminChapController::class);
});


// 3. ROUTE CÁ NHÂN 

Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';