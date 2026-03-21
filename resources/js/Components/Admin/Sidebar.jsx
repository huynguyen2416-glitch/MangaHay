import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    // Giữ nguyên logic đóng mở của bạn
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 transition-all duration-300 relative z-20 shadow-sm`}>
            
            {/* Nút thu gọn được thiết kế lại mượt hơn */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-20 bg-white text-gray-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:text-orange-500 hover:border-orange-200 transition-all z-50"
            >
                <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-[10px]`}></i>
            </button>

            {/* Logo Admin đồng bộ */}
            <div className="h-16 flex items-center justify-center border-b border-gray-200 overflow-hidden whitespace-nowrap px-4">
                <Link href="/admin" className="text-2xl font-black tracking-tight text-gray-800 flex items-center gap-2">
                    {isOpen ? (
                        <>
                            <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white shrink-0">
                                <i className="fas fa-book-open text-sm"></i>
                            </div>
                            <span>Manga<span className="text-orange-500">Hay</span> <span className="text-xs font-bold text-gray-400 ml-1">AD</span></span>
                        </>
                    ) : (
                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white shrink-0">
                            <span className="font-bold">M</span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
                <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2 transition-all ${!isOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                    {isOpen ? 'Bảng điều khiển' : ''}
                </p>
                
                {/* Link Đang Active (Màu cam) */}
                <Link href={route('admin.dashboard')} className={`flex items-center px-3 py-2.5 bg-orange-50 text-orange-600 rounded-lg font-semibold transition group ${!isOpen && 'justify-center'}`}>
                    <i className={`fas fa-chart-pie w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i> 
                    {isOpen && <span className="truncate">Tổng quan</span>}
                </Link>

                <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6 transition-all ${!isOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                    {isOpen ? 'Quản lý dữ liệu' : ''}
                </p>

                <Link href={route('admin.users.index')} className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group ${!isOpen && 'justify-center'}`}>
                    <i className={`fas fa-book w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                    {isOpen && <span className="truncate">User</span>}
                </Link>
                <Link href="#" className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group ${!isOpen && 'justify-center'}`}>
                    <i className={`fas fa-book w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                    {isOpen && <span className="truncate">Truyện</span>}
                </Link>

                <Link href="#" className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group ${!isOpen && 'justify-center'}`}>
                    <i className={`fas fa-list-ol w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                    {isOpen && <span className="truncate">Chapter</span>}
                </Link>
            </nav>
        </aside>
    );
}