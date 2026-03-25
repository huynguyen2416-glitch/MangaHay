<?php
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Client\WelcomeController;
use App\Http\Controllers\Client\TruyenController;
use App\Http\Controllers\Client\ChapController;
use App\Http\Controllers\Client\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TruyenController as AdminTruyenController;
use App\Http\Controllers\Admin\ChapController as AdminChapController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

// 1. ROUTE ĐỘC GIẢ (Ai cũng vào được, không cần đăng nhập)
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::group(['as' => 'client.'], function () {
    // Link xem chi tiết truyện: web.com/truyen/1
    Route::get('/truyen/{id}', [TruyenController::class, 'show'])->name('manga.show');
    // Link đọc truyện: web.com/chuong/15
    Route::get('/chuong/{id}', [ChapController::class, 'show'])->name('chapter.show');
    Route::post('/truyen/{id_manga}/binh-luan', [CommentController::class, 'store'])->name('comment.store');

});


// 2. ROUTE ADMIN (Bắt buộc đăng nhập & Đã chia quyền chi tiết)
Route::prefix('admin')->name('admin.')->group(function () {
    
    // 2.1. Nhóm cho phép Admin (1), Staff (2), Uploader (3) truy cập
    Route::middleware(['auth', 'role:1,2,3'])->group(function () {
        // Trang chủ Dashboard Admin
        Route::get('/', function () {
            return Inertia::render('Admin/Dashboard'); 
        })->name('dashboard');
    });

    // 2.2. Nhóm cho phép Admin (1) và Uploader (3) quản lý truyện
    Route::middleware(['auth', 'role:1,3'])->group(function () {
        Route::resource('truyen', AdminTruyenController::class);
        Route::resource('chap', AdminChapController::class);
    });

    // 2.3. Nhóm cực kỳ quan trọng: CHỈ Admin (1) mới được phép truy cập
    Route::middleware(['auth', 'role:1'])->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('roles', RoleController::class);
    });

});


// 3. ROUTE CÁ NHÂN (Dành cho mọi user đã đăng nhập)
Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/api/chat', [ChatController::class, 'ask'])->name('api.chat');
require __DIR__.'/auth.php';
