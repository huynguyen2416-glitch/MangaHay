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
        Schema::table('truyen_the_loai', function (Blueprint $table) {
            $table->foreign(['id_manga'])->references(['id'])->on('truyen')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['id_theloai'])->references(['id'])->on('the_loai')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('truyen_the_loai', function (Blueprint $table) {
            $table->dropForeign('truyen_the_loai_id_manga_foreign');
            $table->dropForeign('truyen_the_loai_id_theloai_foreign');
        });
    }
};
