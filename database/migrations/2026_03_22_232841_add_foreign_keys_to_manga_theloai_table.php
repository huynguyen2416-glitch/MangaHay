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
        Schema::table('manga_theloai', function (Blueprint $table) {
            $table->foreign(['id_manga'], 'fk_mt_manga')->references(['id_manga'])->on('manga')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['id_theloaimanga'], 'fk_mt_theloai')->references(['id_theloaimanga'])->on('theloai')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('manga_theloai', function (Blueprint $table) {
            $table->dropForeign('fk_mt_manga');
            $table->dropForeign('fk_mt_theloai');
        });
    }
};
