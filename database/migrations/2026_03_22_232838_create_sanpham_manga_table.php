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
        Schema::create('sanpham_manga', function (Blueprint $table) {
            $table->integer('id_spmanga', true);
            $table->integer('id_manga')->index('ibfk_mgsp');
            $table->decimal('gia_ban', 12);
            $table->integer('so_luong_kho')->default(0);
            $table->string('nha_xuat_ban');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sanpham_manga');
    }
};
