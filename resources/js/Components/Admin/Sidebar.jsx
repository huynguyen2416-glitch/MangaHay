import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    
    // Lấy thông tin user hiện tại từ Inertia props để phân quyền
    const { auth } = usePage().props;
    // Giả sử: 1 = Admin, 2 = Staff, 3 = Uploader
    const roleId = auth?.user?.role_id; 

    // Hàm phụ trợ để kiểm tra link active (nếu bạn dùng Ziggy route)
    const isActive = (routeName) => route().current(routeName) 
        ? 'bg-orange-50 text-orange-600' 
        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600';

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 transition-all duration-300 relative z-20 shadow-sm`}>
            
            {/* Nút thu gọn */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-20 bg-white text-gray-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:text-orange-500 hover:border-orange-200 transition-all z-50"
            >
                <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-[10px]`}></i>
            </button>

            {/* Logo Admin */}
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
            <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
                
                {/* 1. BẢNG ĐIỀU KHIỂN CHUNG (Ai cũng thấy) */}
                <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2 transition-all ${!isOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                    {isOpen ? 'Bảng điều khiển' : ''}
                </p>
                
                <Link href={route('admin.dashboard')} className={`flex items-center px-3 py-2.5 rounded-lg font-semibold transition group ${isActive('admin.dashboard')} ${!isOpen && 'justify-center'}`}>
                    <i className={`fas fa-chart-pie w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i> 
                    {isOpen && <span className="truncate">Tổng quan</span>}
                </Link>

                {/* 2. QUẢN LÝ NỘI DUNG SỐ (Admin: 1, Uploader: 3) */}
                {(roleId === 1 || roleId === 3) && (
                    <>
                        <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6 transition-all ${!isOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                            {isOpen ? 'Nội dung số' : ''}
                        </p>
                        <Link href={route('admin.truyen.index')} className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition group ${isActive('admin.truyen.*')} ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-book-open w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Truyện tranh/chữ</span>}
                        </Link>
                        <Link href={route('admin.chap.index')} className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition group ${isActive('admin.chap.*')} ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-list-ol w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Quản lý Chapter</span>}
                        </Link>
                    </>
                )}

                {/* 3. CỬA HÀNG VẬT LÝ - E-COMMERCE (Admin: 1, Staff: 2) */}
                {(roleId === 1 || roleId === 2) && (
                    <>
                        <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6 transition-all ${!isOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                            {isOpen ? 'Cửa hàng vật lý' : ''}
                        </p>
                        <Link href="#" className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-shopping-bag w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Kho sách & Sản phẩm</span>}
                        </Link>
                        <Link href="#" className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group flex-wrap ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-file-invoice-dollar w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate flex-1">Quản lý Đơn hàng</span>}
                            {isOpen && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">Mới</span>}
                        </Link>
                    </>
                )}

                {/* 4. AI BOX & THỐNG KÊ TÀI CHÍNH (Chỉ Admin: 1) */}
                {roleId === 1 && (
                    <>
                        <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6 transition-all ${!isOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                            {isOpen ? 'Hệ thống & AI' : ''}
                        </p>
                        <Link href="#" className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-robot w-5 text-center text-purple-500 ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Quản lý AI Box</span>}
                        </Link>
                        <Link href={route('admin.users.index')} className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition group ${isActive('admin.users.*')} ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-users w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Tài khoản & Phân quyền</span>}
                        </Link>
                        <Link href={route('admin.roles.index')} className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition group ${isActive('admin.roles.*')} ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-user-tag w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Quản lý Vai trò</span>}
                        </Link>
                        <Link href="#" className={`flex items-center px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition group ${!isOpen && 'justify-center'}`}>
                            <i className={`fas fa-chart-line w-5 text-center ${isOpen ? 'mr-3' : 'mr-0'} group-hover:scale-110 transition-transform`}></i>
                            {isOpen && <span className="truncate">Báo cáo Doanh thu</span>}
                        </Link>
                    </>
                )}

            </nav>
        </aside>
    );
}