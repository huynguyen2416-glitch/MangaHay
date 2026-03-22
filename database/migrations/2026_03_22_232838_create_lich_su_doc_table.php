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
        Schema::create('lich_su_doc', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_user')->index('lich_su_doc_id_user_foreign');
            $table->unsignedBigInteger('id_chap')->index('lich_su_doc_id_chap_foreign');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lich_su_doc');
    }
};
