<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChapterImage extends Model
{
    protected $table = 'chapter_images'; 
    

    public function chapter()
    {
        return $this->belongsTo(Chap::class, 'chapter_id', 'id');
    }
}