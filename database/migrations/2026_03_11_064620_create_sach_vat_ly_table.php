<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('sach_vat_ly', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_manga')->constrained('truyen')->onDelete('cascade'); // Sách này thuộc truyện nào
            $table->decimal('gia_ban', 12, 2); // Kiểu số thập phân cho tiền tệ
            $table->integer('so_luong_kho')->default(0);
            $table->string('nha_xuat_ban', 255)->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('sach_vat_ly');
    }
};