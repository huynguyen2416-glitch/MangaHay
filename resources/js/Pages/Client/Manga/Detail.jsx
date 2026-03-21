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
                    {/* Ảnh bìa */}
                    <div className="w-full md:w-1/4 flex-shrink-0">
                        <img 
                            src={manga.cover || '/images/default-cover.jpg'} 
                            alt={manga.title} 
                            className="w-full h-auto rounded-lg shadow-md object-cover aspect-[2/3]"
                        />
                    </div>

                    {/* Chi tiết thông tin */}
                    <div className="w-full md:w-3/4 flex flex-col">
                        <h1 className="text-3xl font-black text-gray-800 mb-2">{manga.title}</h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                            <span className="flex items-center gap-1"><i className="fas fa-user text-orange-500"></i> {manga.author || 'Đang cập nhật'}</span>
                            <span className="flex items-center gap-1"><i className="fas fa-rss text-orange-500"></i> {manga.status || 'Đang tiến hành'}</span>
                            <span className="flex items-center gap-1"><i className="fas fa-eye text-orange-500"></i> {manga.views || 0}</span>
                            <span className="flex items-center gap-1 text-yellow-500 font-bold"><i className="fas fa-star"></i> {manga.rating || '5.0'}</span>
                        </div>

                        {/* Thể loại (Tags) */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {/* Chú ý: Tùy theo cách bạn thiết kế Database mà gọi tên biến cho đúng (genres hoặc categories) */}
                            {manga.genres && manga.genres.length > 0 ? (
                                manga.genres.map((genre, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200 hover:bg-orange-50 hover:text-orange-600 transition cursor-pointer">
                                        {genre.name || genre} 
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-gray-400 italic">Đang cập nhật thể loại</span>
                            )}
                        </div>

                        {/* Nút hành động */}
                        <div className="flex flex-wrap gap-3 mb-6 mt-2">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition flex items-center gap-2">
                                <i className="fas fa-book-open"></i> Đọc từ đầu
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition flex items-center gap-2">
                                <i className="fas fa-bolt text-yellow-400"></i> Đọc mới nhất
                            </button>
                            <button className="bg-red-50 hover:bg-red-100 text-red-500 font-bold py-2.5 px-6 rounded-lg border border-red-200 transition flex items-center gap-2">
                                <i className="fas fa-heart"></i> Theo dõi
                            </button>
                        </div>

                        {/* Tóm tắt nội dung */}
                        <div className="mt-auto">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 border-l-4 border-orange-500 pl-3">Tóm tắt nội dung</h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                {manga.description || 'Chưa có tóm tắt cho truyện này.'}
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
                                    {/* Nhớ truyền đúng route đọc truyện của bạn vào href */}
                                    <Link href={route('chapter.show', chapter.id)} className="flex justify-between items-center px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-800 font-semibold text-sm hover:text-orange-600 transition">
                                                {chapter.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6 text-xs text-gray-500">
                                            <span className="hidden sm:block"><i className="far fa-eye mr-1"></i> {chapter.views || 0}</span>
                                            {/* Format ngày tháng tuỳ theo định dạng từ backend */}
                                            <span><i className="far fa-clock mr-1"></i> {chapter.created_at || 'Mới đây'}</span> 
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