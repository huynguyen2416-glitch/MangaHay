import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Chap({ manga, chapter, images, prevUrl, nextUrl, danhSachChuong }) {
    
    const handleSelectChange = (e) => {
        const selectedChapId = e.target.value;
        router.get(route('client.chapter.show', selectedChapId));
    };

    return (
        <div className="bg-orange-50/40 min-h-screen text-gray-800 pb-12 font-sans">
            <Head title={`Chương ${chapter.so_chuong} - ${manga.ten_truyen}`} />

            {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG (Đã gỡ bỏ ClientLayout để không bị vướng Sidebar/Logo) */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm py-2 sm:py-3 px-3 sm:px-4 z-50 flex flex-col sm:flex-row items-center justify-center relative gap-3 sm:gap-0">
                
                {/* Nút Quay lại truyện (Nằm tuyệt đối ở góc trái trên Desktop) */}
                <div className="sm:absolute sm:left-4 w-full sm:w-auto text-center sm:text-left">
                    <Link href={route('client.manga.show', manga.id)} className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold truncate max-w-full sm:max-w-xs text-sm sm:text-base transition-colors">
                        <span className="mr-1.5 text-lg">←</span> {manga.ten_truyen}
                    </Link>
                </div>
                
                {/* Khu vực Chọn chương */}
                <div className="flex items-center space-x-2">
                    
                    {/* Nút Chương Trước */}
                    {prevUrl ? (
                        <Link href={prevUrl} title="Chương trước" className="bg-white border-2 border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white h-10 w-10 sm:w-11 rounded-lg text-lg font-bold transition-all duration-200 flex items-center justify-center shadow-sm">
                            ❮
                        </Link>
                    ) : (
                        <button disabled className="bg-gray-50 border-2 border-gray-200 text-gray-400 h-10 w-10 sm:w-11 rounded-lg text-lg font-bold cursor-not-allowed flex items-center justify-center">
                            ❮
                        </button>
                    )}

                    {/* MENU THẢ XUỐNG CÁC CHƯƠNG */}
                    <select 
                        value={chapter.id} 
                        onChange={handleSelectChange}
                        className="bg-white text-gray-800 border-2 border-orange-400 rounded-lg h-10 px-3 py-0 w-[160px] sm:w-[240px] outline-none text-sm sm:text-base font-bold cursor-pointer focus:ring focus:ring-orange-200 focus:border-orange-500 shadow-sm transition-all"
                    >
                        {danhSachChuong.map(c => (
                            <option key={c.id} value={c.id}>
                                Chương {c.so_chuong} {c.tieu_de ? `- ${c.tieu_de}` : ''}
                            </option>
                        ))}
                    </select>

                    {/* Nút Chương Sau */}
                    {nextUrl ? (
                        <Link href={nextUrl} title="Chương tiếp" className="bg-orange-500 border-2 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 h-10 w-10 sm:w-11 rounded-lg text-lg font-bold transition-all duration-200 flex items-center justify-center shadow-sm">
                            ❯
                        </Link>
                    ) : (
                        <button disabled className="bg-gray-50 border-2 border-gray-200 text-gray-400 h-10 w-10 sm:w-11 rounded-lg text-lg font-bold cursor-not-allowed flex items-center justify-center">
                            ❯
                        </button>
                    )}
                </div>
            </div>

            {/* KHU VỰC HIỂN THỊ NỘI DUNG ẢNH */}
            <div className="max-w-4xl mx-auto mt-4 flex flex-col items-center bg-white shadow-sm border border-orange-100 min-h-[50vh]">
                {images && images.length > 0 ? (
                    images.map((imgUrl, idx) => (
                        <img 
                            key={idx} 
                            src={imgUrl} 
                            alt={`Trang ${idx + 1}`} 
                            loading="lazy" 
                            className="w-full h-auto object-contain block m-0 p-0" 
                        />
                    ))
                ) : (
                    <div className="text-gray-400 py-20 text-center w-full">
                        <p className="text-4xl mb-4">🥲</p>
                        <p className="text-lg font-semibold">Chương này chưa có ảnh nào.</p>
                    </div>
                )}
            </div>

            {/* THANH ĐIỀU HƯỚNG CUỐI TRANG */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-4 mt-10 px-4">
                {prevUrl ? (
                    <Link href={prevUrl} className="flex-1 flex items-center justify-center bg-white border-2 border-orange-400 text-orange-600 hover:bg-orange-50 hover:-translate-y-1 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-sm hover:shadow-md">
                        <span className="mr-2 text-xl leading-none">«</span> Chương Trước
                    </Link>
                ) : (
                    <button disabled className="flex-1 flex items-center justify-center bg-gray-50 border-2 border-gray-200 text-gray-400 py-3.5 rounded-xl font-bold cursor-not-allowed">
                        <span className="mr-2 text-xl leading-none">«</span> Chương Trước
                    </button>
                )}

                {nextUrl ? (
                    <Link href={nextUrl} className="flex-1 flex items-center justify-center bg-orange-500 border-2 border-orange-500 text-white hover:bg-orange-600 hover:-translate-y-1 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-sm hover:shadow-md">
                        Chương Tiếp <span className="ml-2 text-xl leading-none">»</span>
                    </Link>
                ) : (
                    <button disabled className="flex-1 flex items-center justify-center bg-gray-100 border-2 border-gray-200 text-gray-400 py-3.5 rounded-xl font-bold cursor-not-allowed">
                        Chương Tiếp <span className="ml-2 text-xl leading-none">»</span>
                    </button>
                )}
            </div>
        </div>
    );
}