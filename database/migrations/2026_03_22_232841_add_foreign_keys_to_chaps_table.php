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
        Schema::table('chaps', function (Blueprint $table) {
            $table->foreign(['id_manga'])->references(['id'])->on('truyen')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chaps', function (Blueprint $table) {
            $table->dropForeign('chaps_id_manga_foreign');
        });
    }
};
