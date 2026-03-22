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
        Schema::create('chaps', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_manga')->index('chaps_id_manga_foreign');
            $table->integer('so_chuong');
            $table->string('tieu_de')->nullable();
            $table->longText('noi_dung_chu')->nullable();
            $table->json('danh_sach_anh')->nullable();
            $table->integer('gia_coin')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chaps');
    }
};
