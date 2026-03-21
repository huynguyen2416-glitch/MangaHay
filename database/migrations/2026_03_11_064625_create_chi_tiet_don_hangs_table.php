<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('chi_tiet_don_hang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_donhang')->constrained('don_hang')->onDelete('cascade');
            $table->foreignId('id_sanpham')->constrained('sach_vat_ly')->onDelete('cascade');
            $table->integer('so_luong');
            $table->decimal('gia_luc_mua', 12, 2); // Lưu giá đề phòng sau này sách thay đổi giá
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('chi_tiet_don_hang');
    }
};