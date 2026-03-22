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
        Schema::create('chap', function (Blueprint $table) {
            $table->integer('id_chap', true);
            $table->integer('id_manga')->index('ibfk_mg');
            $table->integer('so_chuong');
            $table->string('tieu_de_chuong');
            $table->longText('noi_dung')->nullable();
            $table->json('danh_sach_anh')->nullable();
            $table->dateTime('ngay_dang')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chap');
    }
};
