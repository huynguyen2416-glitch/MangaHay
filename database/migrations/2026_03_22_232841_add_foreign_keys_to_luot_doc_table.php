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
        Schema::table('luot_doc', function (Blueprint $table) {
            $table->foreign(['id_manga'], 'view')->references(['id_manga'])->on('manga')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('luot_doc', function (Blueprint $table) {
            $table->dropForeign('view');
        });
    }
};
