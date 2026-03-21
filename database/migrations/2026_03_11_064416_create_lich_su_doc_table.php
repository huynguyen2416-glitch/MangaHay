<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('lich_su_doc', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_chap')->constrained('chaps')->onDelete('cascade'); // Đã đọc đến chap nào
            $table->timestamps(); // Thời gian đọc để AI biết truyện nào đang hot
        });
    }
    public function down(): void {
        Schema::dropIfExists('lich_su_doc');
    }
};