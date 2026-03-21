import React from 'react';
import { Link, Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';

export default function Reader({ manga, chapter, images = [], prevUrl, nextUrl }) {
    if (!chapter || !manga) {
        return (
            <ClientLayout hideSidebar={true}>
                <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm text-gray-500">
                    Không tìm thấy nội dung chương này.
                </div>
            </ClientLayout>
        );
    }

    // --- BƯỚC QUAN TRỌNG: GIẢI MÃ CHUỖI JSON THÀNH MẢNG ẢNH ---
    let danhSachAnh = [];
    try {
        // Ưu tiên lấy từ prop images, nếu không có thì lấy từ chapter.danh_sach_anh
        const rawData = images.length > 0 ? images : (chapter.danh_sach_anh || '[]');
        // Nếu nó là chuỗi thì dịch ra (JSON.parse), nếu là mảng sẵn rồi thì giữ nguyên
        danhSachAnh = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    } catch (e) {
        console.error("Lỗi tải ảnh:", e);
    }

    return (
        <ClientLayout hideSidebar={true}>
            {/* Sử dụng ten_chap và ten_truyen */}
            <Head title={`${chapter.ten_chap || 'Đang đọc'} - ${manga.ten_truyen}`} />

            <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
                
                {/* 1. THANH ĐIỀU HƯỚNG */}
                <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 text-center">
                    {/* Sửa lại route thêm client. */}
                    <Link href={route('client.manga.show', manga.id)} className="text-2xl font-black text-gray-800 hover:text-orange-500 transition">
                        {manga.ten_truyen}
                    </Link>
                    <h2 className="text-lg font-semibold text-gray-600 mt-1 mb-4">{chapter.ten_chap || `Chương ${chapter.so_chuong}`}</h2>

                    <div className="flex justify-center items-center gap-3">
                        {prevUrl ? (
                            <Link href={prevUrl} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition">
                                <i className="fas fa-chevron-left mr-1"></i> Chap trước
                            </Link>
                        ) : (
                            <button disabled className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                                <i className="fas fa-chevron-left mr-1"></i> Chap trước
                            </button>
                        )}

                        <Link href={route('client.manga.show', manga.id)} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition">
                            <i className="fas fa-list"></i>
                        </Link>

                        {nextUrl ? (
                            <Link href={nextUrl} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition">
                                Chap sau <i className="fas fa-chevron-right ml-1"></i>
                            </Link>
                        ) : (
                            <button disabled className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                                Chap sau <i className="fas fa-chevron-right ml-1"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* 2. KHU VỰC HIỂN THỊ ẢNH ĐÃ SỬA */}
                <div className="w-full bg-black rounded shadow-md overflow-hidden flex flex-col items-center min-h-[500px]">
                    {danhSachAnh && danhSachAnh.length > 0 ? (
                        danhSachAnh.map((img, index) => (
                            <img 
                                key={index} 
                                src={img.url || img} // Hỗ trợ cả object và link chuỗi
                                alt={`Trang ${index + 1}`} 
                                className="w-full max-w-full h-auto object-contain block m-0 p-0"
                                loading="lazy"
                            />
                        ))
                    ) : (
                        <div className="text-white py-20 italic">Đang cập nhật ảnh cho chương này...</div>
                    )}
                </div>

                {/* 3. THANH ĐIỀU HƯỚNG DƯỚI */}
                <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6 text-center">
                    <div className="flex justify-center items-center gap-3">
                        {prevUrl ? (
                            <Link href={prevUrl} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition">
                                <i className="fas fa-chevron-left mr-1"></i> Chap trước
                            </Link>
                        ) : (
                            <button disabled className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                                <i className="fas fa-chevron-left mr-1"></i> Chap trước
                            </button>
                        )}

                        <Link href={route('client.manga.show', manga.id)} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition">
                            <i className="fas fa-list"></i> Cùng bộ truyện
                        </Link>

                        {nextUrl ? (
                            <Link href={nextUrl} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition">
                                Chap sau <i className="fas fa-chevron-right ml-1"></i>
                            </Link>
                        ) : (
                            <button disabled className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                                Chap sau <i className="fas fa-chevron-right ml-1"></i>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </ClientLayout>
    );
}