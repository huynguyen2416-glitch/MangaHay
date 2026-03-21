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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            
            // Liên kết khóa ngoại với bảng roles
            $table->foreignId('role_id')->default(2)->constrained('roles'); // Mặc định 2 là Customer
            
            $table->string('name'); // Tên hiển thị
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            
            $table->string('so_dien_thoai', 15)->nullable();
            $table->string('anh_dai_dien')->nullable();
            $table->integer('so_du_coin')->default(0); // coin để mua truyện
            $table->boolean('trang_thai')->default(1); // 1: Hoạt động, 0: Bị khóa
            
            $table->rememberToken();
            $table->timestamps();
        });

        
    }
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
