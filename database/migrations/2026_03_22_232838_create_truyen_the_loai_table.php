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
        Schema::create('truyen_the_loai', function (Blueprint $table) {
            $table->unsignedBigInteger('id_manga');
            $table->unsignedBigInteger('id_theloai')->index('truyen_the_loai_id_theloai_foreign');

            $table->primary(['id_manga', 'id_theloai']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('truyen_the_loai');
    }
};
