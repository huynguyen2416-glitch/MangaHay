import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Header() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 border-b border-gray-200 sticky top-0">
            <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
                {/* Icon menu cho mobile (nếu sau này cần) */}
                <i className="fas fa-bars lg:hidden cursor-pointer text-gray-500 hover:text-orange-500 transition"></i>
                <span className="hidden sm:block">Bảng Điều Khiển</span>
            </div>

            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 font-medium hidden md:block">
                    Xin chào, <span className="text-orange-500">{user?.name}</span>
                </span>
                
                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center gap-2 focus:outline-none transition hover:opacity-80 p-1 border border-transparent hover:border-gray-200 rounded-full">
                                {/* Đổi Avatar sang màu Cam */}
                                <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                                </div>
                            </button>
                        </Dropdown.Trigger>

                        {/* Dropdown giống hệt bên Client */}
                        <Dropdown.Content align="right" width="48" contentClasses="py-2 bg-white text-gray-700 border border-gray-100 shadow-xl rounded-lg mt-2">
                            
                            <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Quản trị viên</p>
                            </div>

                            <Dropdown.Link href={route('profile.edit')} className="hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 py-2 px-4 text-sm transition font-medium">
                                <i className="fas fa-id-card w-4 text-center"></i> Hồ sơ cá nhân
                            </Dropdown.Link>

                            <Dropdown.Link href="/" className="hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 py-2 px-4 text-sm transition font-medium">
                                <i className="fas fa-external-link-alt w-4 text-center"></i> Xem trang chủ
                            </Dropdown.Link>
                            
                            <div className="border-t border-gray-100 my-1"></div>

                            {/* Đã fix lỗi class text-red-6 00 */}
                            <Dropdown.Link 
                                href={route('logout')} 
                                method="post" 
                                as="button" 
                                className="hover:bg-red-50 hover:text-red-600 w-full text-left flex items-center gap-3 py-2 px-4 text-sm transition font-medium text-red-500"
                            >
                                <i className="fas fa-power-off w-4 text-center"></i> Đăng xuất
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}