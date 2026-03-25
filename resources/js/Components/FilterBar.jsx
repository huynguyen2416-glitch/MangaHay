// resources/js/Components/FilterBar.jsx
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function FilterBar({ filters = {} }) {
    // Lấy giá trị cũ từ URL (nếu có) để giữ nguyên trạng thái khi load lại
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [sort, setSort] = useState(filters.sort || 'newest');

    // Hàm xử lý khi bấm Tìm kiếm hoặc thay đổi bộ lọc
    const applyFilters = (e) => {
        if (e) e.preventDefault();
        
        // Gửi request GET lên chính URL hiện tại kèm theo tham số
        router.get(
            window.location.pathname, 
            { search, status, sort }, 
            { preserveState: true, replace: true } // Giữ trạng thái trang, không thêm rác vào lịch sử trình duyệt
        );
    };

    return (
        <form onSubmit={applyFilters} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
            
            {/* 1. Ô tìm kiếm tên truyện */}
            <div className="w-full md:w-1/3">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm tên truyện, tác giả..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
            </div>

            {/* 2. Lọc theo trạng thái */}
            <div className="w-full md:w-1/4">
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Đang tiến hành">Đang tiến hành</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Tạm ngưng">Tạm ngưng</option>
                </select>
            </div>

            {/* 3. Sắp xếp */}
            <div className="w-full md:w-1/4">
                <select 
                    value={sort} 
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                >
                    <option value="newest">Mới cập nhật</option>
                    <option value="a-z">Tên A-Z</option>
                    <option value="z-a">Tên Z-A</option>
                </select>
            </div>

            {/* 4. Nút Submit */}
            <div className="w-full md:w-auto flex gap-2">
                <button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition-colors w-full md:w-auto"
                >
                    Lọc
                </button>
                
                {/* Nút xóa lọc */}
                {(search || status || sort !== 'newest') && (
                    <button 
                        type="button" 
                        onClick={() => {
                            setSearch(''); setStatus(''); setSort('newest');
                            router.get(window.location.pathname, {}, { preserveState: true });
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md transition-colors"
                    >
                        Xóa
                    </button>
                )}
            </div>
        </form>
    );
}