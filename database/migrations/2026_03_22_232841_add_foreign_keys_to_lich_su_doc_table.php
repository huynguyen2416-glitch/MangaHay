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
        Schema::table('lich_su_doc', function (Blueprint $table) {
            $table->foreign(['id_chap'])->references(['id'])->on('chaps')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['id_user'])->references(['id'])->on('users')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lich_su_doc', function (Blueprint $table) {
            $table->dropForeign('lich_su_doc_id_chap_foreign');
            $table->dropForeign('lich_su_doc_id_user_foreign');
        });
    }
};
