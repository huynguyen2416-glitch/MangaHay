<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('don_hang', function (Blueprint $table) {
            $table->integer('id_order', true);
            $table->integer('id_taikhoan')->index('skbd');
            $table->dateTime('ngay_dat')->useCurrent();
            $table->decimal('tong_tien', 12);
            $table->boolean('trang_thai_thanh_toan')->default(false);
            $table->string('dia_chi_giao_hang');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('don_hang');
    }
};
