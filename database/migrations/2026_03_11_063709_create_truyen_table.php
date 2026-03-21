<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('truyen', function (Blueprint $table) {
            $table->id(); // Khóa chính tự tăng
            
            // id_nguoidang liên kết với id của bảng users (Để biết Uploader/Admin nào đăng truyện này)
            $table->foreignId('id_nguoidang')->constrained('users')->onDelete('cascade');
            
            $table->string('ten_truyen', 255);
            $table->text('mo_ta')->nullable();
            $table->string('tac_gia', 255)->nullable();
            $table->string('anh_bia', 255)->nullable();
            $table->boolean('trang_thai')->default(1); // 1: Đang ra, 0: Đã hoàn thành
            
            $table->timestamps(); // Tự động tạo ngày đăng và ngày cập nhật
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('truyen');
    }
};
