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
        Schema::table('comment', function (Blueprint $table) {
            $table->foreign(['id_manga'], '123')->references(['id_manga'])->on('manga')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_taikhoan'], '1234')->references(['ID_TAIKHOAN'])->on('taikhoan')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comment', function (Blueprint $table) {
            $table->dropForeign('123');
            $table->dropForeign('1234');
        });
    }
};
