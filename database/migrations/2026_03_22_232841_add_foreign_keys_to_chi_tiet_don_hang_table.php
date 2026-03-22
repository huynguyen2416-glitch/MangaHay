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
        Schema::table('chi_tiet_don_hang', function (Blueprint $table) {
            $table->foreign(['id_order'], 'ibfk_od')->references(['id_order'])->on('don_hang')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_spmanga'], 'ibfk_sp')->references(['id_spmanga'])->on('sanpham_manga')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chi_tiet_don_hang', function (Blueprint $table) {
            $table->dropForeign('ibfk_od');
            $table->dropForeign('ibfk_sp');
        });
    }
};
