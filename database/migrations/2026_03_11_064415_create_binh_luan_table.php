<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('binh_luan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_manga')->constrained('truyen')->onDelete('cascade');
            
            // Bình luận có thể thuộc về 1 chương cụ thể, hoặc null nếu bình luận chung cho cả truyện
            $table->foreignId('id_chap')->nullable()->constrained('chaps')->onDelete('cascade');
            
            $table->text('noi_dung');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('binh_luan');
    }
};