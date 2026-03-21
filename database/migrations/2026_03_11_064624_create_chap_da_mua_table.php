<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('chap_da_mua', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_chap')->constrained('chaps')->onDelete('cascade');
            
            $table->integer('gia_coin_luc_mua')->default(0); // Lưu lại giá lúc mua nhỡ sau này truyện tăng/giảm giá
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('chap_da_mua');
    }
};