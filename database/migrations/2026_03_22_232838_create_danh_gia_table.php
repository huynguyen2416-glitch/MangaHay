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
        Schema::create('danh_gia', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_user')->index('danh_gia_id_user_foreign');
            $table->unsignedBigInteger('id_manga')->index('danh_gia_id_manga_foreign');
            $table->tinyInteger('so_sao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('danh_gia');
    }
};
