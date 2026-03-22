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
        Schema::create('sach_vat_ly', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_manga')->index('sach_vat_ly_id_manga_foreign');
            $table->decimal('gia_ban', 12);
            $table->integer('so_luong_kho')->default(0);
            $table->string('nha_xuat_ban')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sach_vat_ly');
    }
};
