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
        Schema::create('chi_tiet_don_hang', function (Blueprint $table) {
            $table->integer('id_oritem', true);
            $table->integer('id_order')->index('ibfk_od');
            $table->integer('id_spmanga')->index('ibfk_sp');
            $table->integer('so_luong');
            $table->decimal('gia_tai_thoi_diem_mua', 12);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_tiet_don_hang');
    }
};
