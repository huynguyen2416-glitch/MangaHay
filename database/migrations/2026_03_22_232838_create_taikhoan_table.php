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
        Schema::create('taikhoan', function (Blueprint $table) {
            $table->integer('ID_TAIKHOAN', true);
            $table->integer('ID_VAITRO')->nullable()->index('ibfk_vt');
            $table->string('TENTAIKHOAN', 100);
            $table->string('MATKHAU');
            $table->string('EMAIL', 100)->nullable();
            $table->string('SDT', 15)->nullable();
            $table->dateTime('NGAYLAP')->nullable()->useCurrent();
            $table->string('ANH')->nullable();
            $table->tinyInteger('TRANGTHAI')->nullable()->default(1);
            $table->string('GIOITINH', 4)->nullable();
            $table->dateTime('last_login', 6)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taikhoan');
    }
};
