<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // Báo cho Laravel biết model này làm việc với bảng 'roles'
    protected $table = 'roles';

    // Cột được phép thêm/sửa dữ liệu
    protected $fillable = [
        'ten_vaitro',
    ];

    // Mối quan hệ 1-N: 1 Vai trò sẽ có nhiều Người dùng (Users)
    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'id');
    }
}