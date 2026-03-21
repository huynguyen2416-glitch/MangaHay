<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chap extends Model
{
    use HasFactory;

    protected $table = 'chaps';
    // Chương này thuộc về 1 Truyện
    public function truyen()
    {
        return $this->belongsTo(Truyen::class, 'id_manga', 'id');
    }
}