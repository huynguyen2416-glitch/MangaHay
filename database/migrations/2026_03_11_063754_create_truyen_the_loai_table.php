<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('truyen_the_loai', function (Blueprint $table) {
            // Nối với bảng mangas
            $table->foreignId('id_manga')->constrained('truyen')->onDelete('cascade');
            // Nối với bảng theloai (mà bạn đã tạo ở bước trước)
            $table->foreignId('id_theloai')->constrained('the_loai')->onDelete('cascade');
            
            // Khóa chính kép (Để 1 truyện không bị gán trùng 1 thể loại 2 lần)
            $table->primary(['id_manga', 'id_theloai']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('truyen_the_loai');
    }
};