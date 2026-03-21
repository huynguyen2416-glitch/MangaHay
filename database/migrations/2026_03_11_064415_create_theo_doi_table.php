<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('theo_doi', function (Blueprint $table) {
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_manga')->constrained('truyen')->onDelete('cascade');
            
            // Đảm bảo 1 user chỉ có thể theo dõi 1 truyện 1 lần
            $table->primary(['id_user', 'id_manga']); 
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('theo_doi');
    }
};