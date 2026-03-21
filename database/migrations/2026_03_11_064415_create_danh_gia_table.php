<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('danh_gia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_manga')->constrained('truyen')->onDelete('cascade');
            $table->tinyInteger('so_sao'); // Lưu số từ 1 đến 5
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('danh_gia');
    }
};