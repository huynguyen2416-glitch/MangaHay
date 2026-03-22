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
        Schema::table('manga', function (Blueprint $table) {
            $table->foreign(['id_chap'], 'ibfk_chap')->references(['id_chap'])->on('chap')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_theloaimanga'], 'ibfk_lmg')->references(['id_theloaimanga'])->on('manga_theloai')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_taikhoan'], 'ibfk_tk')->references(['ID_TAIKHOAN'])->on('taikhoan')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('manga', function (Blueprint $table) {
            $table->dropForeign('ibfk_chap');
            $table->dropForeign('ibfk_lmg');
            $table->dropForeign('ibfk_tk');
        });
    }
};
