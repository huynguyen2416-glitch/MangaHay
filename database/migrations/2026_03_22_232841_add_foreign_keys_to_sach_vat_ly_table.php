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
        Schema::table('sach_vat_ly', function (Blueprint $table) {
            $table->foreign(['id_manga'])->references(['id'])->on('truyen')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sach_vat_ly', function (Blueprint $table) {
            $table->dropForeign('sach_vat_ly_id_manga_foreign');
        });
    }
};
