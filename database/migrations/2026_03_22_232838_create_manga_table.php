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
        Schema::create('manga', function (Blueprint $table) {
            $table->integer('id_manga', true);
            $table->integer('id_theloaimanga')->index('ibfk_lmg');
            $table->integer('id_taikhoan')->index('ibfk_tk');
            $table->integer('id_chap')->index('ibfk_chap');
            $table->string('manga_name')->nullable();
            $table->string('mota')->nullable();
            $table->string('tacgia')->nullable();
            $table->string('anh');
            $table->boolean('sratus');
            $table->dateTime('create_day', 4)->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manga');
    }
};
