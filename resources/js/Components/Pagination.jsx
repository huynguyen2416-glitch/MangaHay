
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
// Nếu không có links hoặc chỉ có 3 links (Previous, Next, và một trang duy nhất), không hiển thị pagination
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8 mb-4">
            {links.map((link, index) => {
                // Xử lý nhãn
                let label = link.label
                    .replace('&laquo; Previous', '<i class="fas fa-chevron-left"></i>')
                    .replace('Next &raquo;', '<i class="fas fa-chevron-right"></i>');

                // Nếu nút bị vô hiệu hóa (ví dụ: đang ở trang 1 thì nút Prev mờ đi)
                if (link.url === null) {
                    return (
                        <div 
                            key={index} 
                            className="px-4 py-2 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed flex items-center justify-center min-w-[40px]"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                // Nếu là nút có thể bấm được (trang hiện tại hoặc trang khác)
                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll // Giữ nguyên vị trí cuộn trang khi chuyển page
                        className={`px-4 py-2 text-sm rounded-md transition-all flex items-center justify-center min-w-[40px] ${
                            link.active
                                ? 'bg-[#ff6740] text-white border border-[#ff6740] font-bold shadow-md transform scale-105'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:text-[#ff6740] hover:border-[#ff6740]'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}