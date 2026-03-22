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
        Schema::create('manga_theloai', function (Blueprint $table) {
            $table->integer('id_manga');
            $table->integer('id_theloaimanga')->index('fk_mt_theloai');

            $table->primary(['id_manga', 'id_theloaimanga']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manga_theloai');
    }
};
