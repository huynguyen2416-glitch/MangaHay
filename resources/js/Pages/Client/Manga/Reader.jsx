import React from 'react';
import { Link, Head } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';

export default function Reader({ manga, chapter, images = [], prevUrl, nextUrl }) {
    // Nếu không có dữ liệu chapter (tránh lỗi)
    if (!chapter || !manga) {
        return (
            <ClientLayout hideSidebar={true}>
                <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm text-gray-500">
                    Không tìm thấy nội dung chương này.
                </div>
            </ClientLayout>
        );
    }

    return (
        // Thêm hideSidebar={true} để ẩn thanh bên phải, mở rộng không gian đọc
        <ClientLayout hideSidebar={true}>
            <Head title={`${chapter.name} - ${manga.title}`} />

            <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
                
                {/* 1. THANH ĐIỀU HƯỚNG TRÊN CÙNG */}
                <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 text-center">
                    {/* Đường dẫn truyện */}
                    <Link href={route('manga.show', manga.id)} className="text-2xl font-black text-gray-800 hover:text-orange-500 transition">
                        {manga.title}
                    </Link>
                    <h2 className="text-lg font-semibold text-gray-600 mt-1 mb-4">{chapter.name}</h2>

                    {/* Nút Chuyển Chương */}
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

                        <Link href={route('manga.show', manga.id)} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition">
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

                {/* 2. KHU VỰC HIỂN THỊ ẢNH TRUYỆN */}
                <div className="w-full bg-black rounded shadow-md overflow-hidden flex flex-col items-center min-h-[500px]">
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <img 
                                key={index} 
                                src={img.url || img} // Tuỳ vào dữ liệu backend trả về dạng object hay mảng chuỗi
                                alt={`Page ${index + 1}`} 
                                className="w-full max-w-full h-auto object-contain block m-0 p-0"
                                loading="lazy" // Giúp tải ảnh mượt hơn, cuộn tới đâu tải tới đó
                            />
                        ))
                    ) : (
                        <div className="text-white py-20 italic">Đang cập nhật ảnh cho chương này...</div>
                    )}
                </div>

                {/* 3. THANH ĐIỀU HƯỚNG DƯỚI CÙNG (Giống y hệt thanh trên để đỡ phải cuộn lên) */}
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

                        <Link href={route('manga.show', manga.id)} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition">
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