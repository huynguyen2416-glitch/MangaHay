<?php
use App\Http\Controllers\Client\TruyenController;
use App\Http\Controllers\Client\ChapController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia;



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

Route::middleware(['auth'])->group(function () {
    
    Route::get('/admin', function () {
        $user = Auth::user();


        if (!$user || ($user->id !== 1 )) {
            return redirect('/');
        }
        return Inertia::render('Admin/Dashboard'); 
    })->name('admin.dashboard');

});
Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class);
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