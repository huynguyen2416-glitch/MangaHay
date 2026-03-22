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
        Schema::create('binh_luan', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_user')->index('binh_luan_id_user_foreign');
            $table->unsignedBigInteger('id_manga')->index('binh_luan_id_manga_foreign');
            $table->unsignedBigInteger('id_chap')->nullable()->index('binh_luan_id_chap_foreign');
            $table->text('noi_dung');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('binh_luan');
    }
};
