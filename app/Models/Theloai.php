<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theloai extends Model
{
    use HasFactory;

    protected $table = 'the_loai'; 
    protected $fillable = [
        'ten_theloai', 'mo_ta'
    ];
    public function truyens()
    {
        return $this->belongsToMany(Truyen::class, 'truyen_theloai', 'theloai_id', 'id_manga');
    }
}