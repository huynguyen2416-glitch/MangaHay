<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chap extends Model
{
    use HasFactory;

    protected $table = 'chaps';

    protected $fillable = [
        'id_manga', 'so_chuong', 'tieu_de', 'gia_coin'
    ];

    // Chương này thuộc về 1 Truyện
    public function manga()
    {
        return $this->belongsTo(Truyen::class, 'id_manga', 'id');
    }
}