<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('thong_bao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->text('noi_dung');
            $table->boolean('da_doc')->default(0); // 0: Chưa đọc, 1: Đã đọc
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('thong_bao');
    }
};