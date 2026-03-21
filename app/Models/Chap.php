<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chap extends Model
{
    use HasFactory;

    protected $table = 'chaps';
    protected $fillable = [
        'id_manga',
        'ten_chap',
        'so_chuong',
        'noi_dung_chu',
        'danh_sach_anh',
        'gia_coin'
    ];
    public function truyen()
    {
        return $this->belongsTo(Truyen::class, 'id_manga', 'id');
    }
}