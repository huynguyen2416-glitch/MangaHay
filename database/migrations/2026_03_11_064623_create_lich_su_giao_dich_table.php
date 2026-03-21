<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('lich_su_giao_dich', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            
            // Số coin thay đổi (Ví dụ: +10000 là nạp tiền, -500 là mua truyện)
            $table->integer('so_coin_thay_doi'); 
            
            // Phân loại: 'nap_coin', 'mua_chuong', 'hoan_tien'...
            $table->string('loai_giao_dich', 50); 
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('lich_su_giao_dich');
    }
};