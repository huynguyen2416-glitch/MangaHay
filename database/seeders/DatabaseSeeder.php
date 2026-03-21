<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
 
        // 1. TẠO VAI TRÒ (ROLES)
 
        DB::table('roles')->insert([
            ['ten_vaitro' => 'Admin'],
            ['ten_vaitro' => 'Customer'],
        ]);

 
        // 2. TẠO TÀI KHOẢN (USERS)
 
        DB::table('users')->insert([
            [
                'role_id' => 1,
                'name' => 'Admin Đẹp Trai',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('123456'), 
                'so_du_coin' => 999999, 
            ],
            [
                'role_id' => 2,
                'name' => 'Độc Giả Đại Gia',
                'email' => 'user@gmail.com',
                'password' => Hash::make('123456'),
                'so_du_coin' => 5000, 
            ]
        ]);

 
        // 3. TẠO THỂ LOẠI (CATEGORIES)
 
        // ID 1: Hành Động, ID 2: Hài Hước, ID 3: Tình Cảm
        DB::table('theloai')->insert([
            ['ten_theloai' => 'Hành Động', 'mo_ta' => 'Đánh nhau bùm chéo', 'trang_thai' => 1],
            ['ten_theloai' => 'Hài Hước', 'mo_ta' => 'Cười đau ruột', 'trang_thai' => 1],
            ['ten_theloai' => 'Tình Cảm', 'mo_ta' => 'Ngôn tình sến súa', 'trang_thai' => 1],
        ]);

 
        // 4. DANH SÁCH 12 BỘ TRUYỆN (KÈM THỂ LOẠI)
 
        $mangasData = [
            [
                'ten_truyen' => 'Chú thuật hồi chiến (Jujutsu Kaisen)',
                'mo_ta' => 'Hành trình của Itadori Yuji nuốt ngón tay Sukuna...',
                'tac_gia' => 'Gege Akutami',
                'anh_bia' => '/images/mangas/jjk3.jpg', 
                'the_loai' => [1] // Hành động
            ],
            [
                'ten_truyen' => 'Doraemon',
                'mo_ta' => 'Chú mèo máy đến từ tương lai và những bảo bối thần kỳ.',
                'tac_gia' => 'Fujiko F. Fujio',
                'anh_bia' => '/images/mangas/doremon.jpg', 
                'the_loai' => [2, 3] // Hài hước, Tình cảm
            ],
            [
                'ten_truyen' => 'Solo Leveling',
                'mo_ta' => 'Từ một thợ săn yếu nhất nhân loại, Sung Jin-Woo thức tỉnh hệ thống bí ẩn...',
                'tac_gia' => 'Chugong',
                'anh_bia' => '/images/mangas/solo-leveling.jpg',
                'the_loai' => [1] // Hành động
            ],
            [
                'ten_truyen' => 'One Piece',
                'mo_ta' => 'Cuộc hành trình tìm kiếm kho báu One Piece vĩ đại của Monkey D. Luffy.',
                'tac_gia' => 'Eiichiro Oda',
                'anh_bia' => '/images/mangas/one-piece.jpg',
                'the_loai' => [1, 2] // Hành động, Hài hước
            ],
            [
                'ten_truyen' => 'Date A Live',
                'mo_ta' => 'Để cứu thế giới khỏi sự tàn phá của các Tinh linh, cách duy nhất là... hẹn hò với họ!',
                'tac_gia' => 'Tachibana Koushi',
                'anh_bia' => '/images/mangas/date-alive.jpg',
                'the_loai' => [1, 3] // Hành động, Tình cảm
            ],
            [
                'ten_truyen' => 'Berserk',
                'mo_ta' => 'Hành trình trả thù đẫm máu và u tối của Kiếm sĩ đen Guts.',
                'tac_gia' => 'Kentaro Miura',
                'anh_bia' => '/images/mangas/berserk.jpg',
                'the_loai' => [1] // Hành động
            ],
            [
                'ten_truyen' => 'Spy x Family',
                'mo_ta' => 'Một điệp viên, một sát thủ và một cô bé siêu năng lực vô tình tạo nên một gia đình.',
                'tac_gia' => 'Tatsuya Endo',
                'anh_bia' => '/images/mangas/spy-x-family.jpg',
                'the_loai' => [1, 2, 3] // Hành động, Hài hước, Tình cảm
            ],
            [
                'ten_truyen' => 'Chainsaw Man',
                'mo_ta' => 'Cậu thiếu niên Denji mang trong mình trái tim của ác quỷ Cưa Máy.',
                'tac_gia' => 'Tatsuki Fujimoto',
                'anh_bia' => '/images/mangas/chainsaw-man.jpg',
                'the_loai' => [1] // Hành động
            ],
            [
                'ten_truyen' => 'Naruto',
                'mo_ta' => 'Câu chuyện về Naruto mang trong mình phong ấn của Cửu Vĩ Hồ.',
                'tac_gia' => 'Masashi Kishimoto',
                'anh_bia' => '/images/mangas/naruto.jpg',
                'the_loai' => [1, 2] // Hành động, Hài hước
            ],
            [
                'ten_truyen' => 'Bleach',
                'mo_ta' => 'Kurosaki Ichigo vô tình nhận được sức mạnh của một Tử Thần.',
                'tac_gia' => 'Tite Kubo',
                'anh_bia' => '/images/mangas/bleach.jpg',
                'the_loai' => [1] // Hành động
            ],
            [
                'ten_truyen' => 'Dragon Ball Super',
                'mo_ta' => 'Những cuộc phiêu lưu mới của Goku và nhóm bạn sau khi đánh bại Majin Buu.',
                'tac_gia' => 'Akira Toriyama',
                'anh_bia' => '/images/mangas/dragon-ball-super.jpg',
                'the_loai' => [1, 2] // Hành động, Hài hước
            ],
            [
                'ten_truyen' => 'Attack on Titan',
                'mo_ta' => 'Cuộc chiến sinh tồn đầy bi tráng của nhân loại chống lại những Titan.',
                'tac_gia' => 'Hajime Isayama',
                'anh_bia' => '/images/mangas/attack-on-titan.jpg',
                'the_loai' => [1] // Hành động
            ],
        ];

 
        // 5. BƠM TRUYỆN, THỂ LOẠI & CHAPTER VÀO DB
 
        foreach ($mangasData as $data) {
            
            // Insert Truyện và lấy ID vừa tạo
            $mangaId = DB::table('mangas')->insertGetId([
                'id_nguoidang' => 1, // Do Admin đăng
                'ten_truyen' => $data['ten_truyen'],
                'mo_ta' => $data['mo_ta'],
                'tac_gia' => $data['tac_gia'],
                'anh_bia' => $data['anh_bia'],
                'trang_thai' => 1,
            ]);

            // Gắn Thể loại cho Truyện vào bảng trung gian (manga_theloai)
            foreach ($data['the_loai'] as $id_theloai) {
                DB::table('manga_theloai')->insert([
                    'id_manga' => $mangaId,
                    'id_theloai' => $id_theloai
                ]);
            }

            // Tạo 5 Chapter cho mỗi truyện
            for ($i = 1; $i <= 5; $i++) {
                DB::table('chaps')->insert([
                    'id_manga' => $mangaId,
                    'so_chuong' => $i,
                    'tieu_de' => 'Chương ' . $i . ': Tiêu đề bí ẩn',
                    // Chương 1 đọc miễn phí, từ Chương 2 trở đi tốn 500 coin
                    'gia_coin' => ($i == 1) ? 0 : 500, 
                ]);
            }
        }
    }
}