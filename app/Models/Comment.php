<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Comment extends Model
{
    use HasFactory;

    // 1. Chỉ định tên bảng trong CSDL
    protected $table = 'binh_luan';

    // 2. Các cột được phép thêm dữ liệu
    protected $fillable = [
        'id_user',
        'id_manga',
        'id_chap',
        'noi_dung',
        'parent_id'
    ];

    // 3. Tự động đính kèm trường time_ago khi trả về JSON/Array
    protected $appends = ['time_ago'];

    // --- CÁC MỐI QUAN HỆ (RELATIONSHIPS) ---

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function truyen()
    {
        return $this->belongsTo(Truyen::class, 'id_manga');
    }

    public function chap()
    {
        return $this->belongsTo(Chap::class, 'id_chap');
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->orderBy('created_at', 'asc');
    }
    public function getTimeAgoAttribute()
    {
        Carbon::setLocale('vi'); // Hiển thị tiếng Việt (VD: "5 phút trước")
        return $this->created_at ? $this->created_at->diffForHumans() : '';
    }
}