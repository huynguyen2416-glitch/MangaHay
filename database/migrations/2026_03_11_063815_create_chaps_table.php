<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chaps', function (Blueprint $table) {
            $table->id();
            
            // Nối với bảng mangas (Chương này thuộc truyện nào)
            $table->foreignId('id_manga')->constrained('truyen')->onDelete('cascade');
            
            $table->integer('so_chuong');
            $table->string('tieu_de', 255)->nullable();
            
            // Hỗ trợ cả truyện chữ và truyện tranh như bạn yêu cầu
            $table->longText('noi_dung_chu')->nullable(); // Dành cho truyện chữ
            $table->json('danh_sach_anh')->nullable(); // Dành cho truyện tranh (Lưu mảng các link ảnh)
            
            // Hệ thống nạp coin (Trả phí mở khóa)
            $table->integer('gia_coin')->default(0); // 0 là chương đọc miễn phí
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chaps');
    }
};