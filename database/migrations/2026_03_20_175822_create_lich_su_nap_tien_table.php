<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lich_su_nap_tien', function (Blueprint $table) {
            $table->id(); // Tự động tạo khóa chính 'id' (bigint unsigned auto_increment)
            
            // Khóa ngoại liên kết với bảng users
            $table->unsignedBigInteger('id_user');
            
            // Mã giao dịch trả về từ cổng thanh toán (có thể null nếu chưa thanh toán xong)
            $table->string('ma_giao_dich_gateway', 100)->nullable()->comment('Mã GD từ VNPay/Momo');
            
            // Số tiền VNĐ (dùng kiểu decimal để chính xác tuyệt đối về tiền tệ)
            $table->decimal('so_tien_vnd', 12, 2);
            
            // Mục đích nạp tiền
            $table->enum('loai_nap', ['mua_coin', 'mua_vip'])->default('mua_coin');
            
            // Phương thức thanh toán
            $table->enum('phuong_thuc', ['VNPAY', 'MOMO', 'BANK_TRANSFER']);
            
            // Trạng thái đơn nạp
            $table->enum('trang_thai', ['cho_thanh_toan', 'thanh_cong', 'that_bai'])->default('cho_thanh_toan');

            $table->timestamps(); // Tự động tạo 2 cột created_at và updated_at

            // Khai báo ràng buộc khóa ngoại (Xóa user thì lịch sử nạp cũng tự mất)
            $table->foreign('id_user')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lich_su_nap_tien');
    }
};