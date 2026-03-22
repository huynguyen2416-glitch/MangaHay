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
        Schema::table('binh_luan', function (Blueprint $table) {
            $table->foreign(['id_chap'])->references(['id'])->on('chaps')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['id_manga'])->references(['id'])->on('truyen')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['id_user'])->references(['id'])->on('users')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('binh_luan', function (Blueprint $table) {
            $table->dropForeign('binh_luan_id_chap_foreign');
            $table->dropForeign('binh_luan_id_manga_foreign');
            $table->dropForeign('binh_luan_id_user_foreign');
        });
    }
};
