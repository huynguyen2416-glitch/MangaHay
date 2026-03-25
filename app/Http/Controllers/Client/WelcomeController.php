<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Truyen;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    // Bổ sung tham số Request $request vào hàm
    public function index(Request $request)
    {
        // 1. Khởi tạo Query cơ bản (vẫn kèm latestChapter)
        $query = Truyen::with('latestChapter');

        // 2. Lọc theo từ khóa tìm kiếm (Tên truyện hoặc Tác giả)
        if ($request->filled('search')) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function($q) use ($searchTerm) {
                $q->where('ten_truyen', 'like', $searchTerm)
                  ->orWhere('tac_gia', 'like', $searchTerm);
            });
        }

        // 3. Lọc theo trạng thái
        if ($request->filled('status')) {
            $query->where('trang_thai', $request->status);
        }

        // 4. Sắp xếp
        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'a-z':
                    $query->orderBy('ten_truyen', 'asc');
                    break;
                case 'z-a':
                    $query->orderBy('ten_truyen', 'desc');
                    break;
                case 'newest':
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }
        } else {
            // Mặc định luôn sắp xếp mới nhất
            $query->orderBy('created_at', 'desc');
        }

        // 5. Trả về dữ liệu (Nhớ thêm appends/withQueryString để thanh phân trang không bị mất filter)
        // Lưu ý: Nếu bạn đang dùng ->get(), hãy cân nhắc chuyển sang ->paginate(12) để tránh web bị lag khi có 1000 truyện.
        $manga = $query->paginate(12)->withQueryString(); 

        return Inertia::render('Client/Welcome', [
            'manga' => $manga,
            // Trả ngược lại các tham số filter để Component React hiển thị đúng những gì user vừa chọn
            'filters' => $request->only(['search', 'status', 'sort']) 
        ]);
    }
}