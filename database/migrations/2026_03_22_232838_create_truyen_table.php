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
        Schema::create('truyen', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_nguoidang')->index('truyen_id_nguoidang_foreign');
            $table->string('ten_truyen');
            $table->text('mo_ta')->nullable();
            $table->string('tac_gia')->nullable();
            $table->string('anh_bia')->nullable();
            $table->boolean('trang_thai')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('truyen');
    }
};
