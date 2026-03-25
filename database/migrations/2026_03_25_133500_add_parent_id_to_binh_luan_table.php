<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('binh_luan', function (Blueprint $table) {
            // Thêm cột parent_id, cho phép null (bình luận gốc thì không có cha)
            $table->unsignedBigInteger('parent_id')->nullable()->after('id_chap');
        });
    }

    public function down()
    {
        Schema::table('binh_luan', function (Blueprint $table) {
            $table->dropColumn('parent_id');
        });
    }
};
