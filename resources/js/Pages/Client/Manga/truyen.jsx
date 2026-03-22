import React from 'react';
import { Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout'; 

export default function Detail({ manga, chapters = [] }) {
    if (!manga) {
        return (
            <ClientLayout>
                <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm text-gray-500">
                    Không tìm thấy thông tin truyện.
                </div>
            </ClientLayout>
        );
    }

    return (
        <ClientLayout>
            {/* 1. KHỐI THÔNG TIN TRUYỆN */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Ảnh bìa (Khớp với cột anh_bia) */}
                    <div className="w-full md:w-1/4 flex-shrink-0">
                        <img 
                            src={manga.anh_bia || '/images/default-cover.jpg'} 
                            alt={manga.ten_truyen} 
                            className="w-full h-auto rounded-lg shadow-md object-cover aspect-[2/3]"
                        />
                    </div>

                    {/* Chi tiết thông tin */}
                    <div className="w-full md:w-3/4 flex flex-col">
                        <h1 className="text-3xl font-black text-gray-800 mb-2">{manga.ten_truyen}</h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                            <span className="flex items-center gap-1"><i className="fas fa-user text-orange-500"></i> {manga.tac_gia || 'Đang cập nhật'}</span>
                            <span className="flex items-center gap-1"><i className="fas fa-rss text-orange-500"></i> {manga.trang_thai === 1 ? 'Đã hoàn thành' : 'Đang tiến hành'}</span>
                            <span className="flex items-center gap-1"><i className="fas fa-eye text-orange-500"></i> {manga.luot_xem || 0}</span>
                        </div>

                        {/* Thể loại */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {manga.theloais && manga.theloais.length > 0 ? (
                                manga.theloais.map((theloai, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200 hover:bg-orange-50 hover:text-orange-600 transition cursor-pointer">
                                        {theloai.ten_the_loai || theloai.ten} 
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-gray-400 italic">Đang cập nhật thể loại</span>
                            )}
                        </div>

                        {/* Tóm tắt nội dung (Khớp với cột mo_ta) */}
                        <div className="mt-auto">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 border-l-4 border-orange-500 pl-3">Mô tả nội dung</h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                {manga.mo_ta || 'Chưa có mô tả cho truyện này.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. KHỐI DANH SÁCH CHƯƠNG */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <i className="fas fa-list text-orange-500"></i> Danh sách chương
                    </h3>
                    <span className="text-sm font-semibold text-gray-500">{chapters.length} Chương</span>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                    <ul className="divide-y divide-gray-100">
                        {chapters.length > 0 ? (
                            chapters.map((chapter) => (
                                <li key={chapter.id} className="hover:bg-orange-50 transition">
                                    <Link href={route('client.chapter.show', chapter.id)} className="flex justify-between items-center px-6 py-4">
                                        <div className="flex items-center gap-3">
                                           <span className="text-gray-800 font-semibold text-sm hover:text-orange-600 transition">
                                                {chapter.tieu_de || `Chương ${chapter.so_chuong}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6 text-xs text-gray-500">
                                            <span className="hidden sm:block"><i className="far fa-eye mr-1"></i> {chapter.luot_xem || 0}</span>
                                            <span><i className="far fa-clock mr-1"></i> {chapter.updated_at ? new Date(chapter.updated_at).toLocaleDateString() : 'Chưa cập nhật'}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="px-6 py-8 text-center text-gray-500 text-sm italic">
                                Truyện chưa cập nhật chương nào.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </ClientLayout>
    );
}