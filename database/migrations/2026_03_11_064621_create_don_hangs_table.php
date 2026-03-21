<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('don_hang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->decimal('tong_tien', 12, 2);
            $table->tinyInteger('trang_thai_don')->default(0); // 0: Chờ duyệt, 1: Đang giao, 2: Hoàn thành, 3: Đã hủy
            $table->string('dia_chi_giao', 255);
            $table->string('so_dien_thoai_giao', 15); // Đôi khi user nhận hàng bằng SĐT khác SĐT đăng ký
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('don_hang');
    }
};