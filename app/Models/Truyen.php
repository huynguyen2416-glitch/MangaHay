<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Truyen extends Model
{
    use HasFactory;
    
    protected $table = 'truyen';
    protected $fillable = [
        'id_nguoidang',   
        'ten_truyen', 
        'mo_ta', 
        'tac_gia', 
        'anh_bia', 
        'trang_thai'
    ];
    // Lấy chương mới nhất của truyện
    public function latestChapter(){
    return $this->hasOne(Chap::class, 'id_manga')->latestOfMany();
    }
    // Truyện này thuộc về 1 người đăng (User)
    public function nguoiDang(){
        return $this->belongsTo(User::class, 'id_nguoidang', 'id');
    }

    // 1 Truyện có nhiều Chương
    public function chaps() {
        return $this->hasMany(Chap::class, 'id_manga', 'id');
    }

    // 1 Truyện có nhiều Thể loại (Bảng trung gian manga_theloai)
    public function theloais(){
        return $this->belongsToMany(Theloai::class, 'manga_theloai', 'id_manga', 'id_theloai');
    }
}