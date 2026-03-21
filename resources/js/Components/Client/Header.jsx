import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Header() {
    const { auth } = usePage().props;
    const user = auth?.user; 

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center justify-between p-3 w-full max-w-7xl mx-auto">
                {/* Logo phong cách MangaDex */}
                <Link href="/" className="text-2xl font-black tracking-tight text-gray-800 flex items-center gap-1">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white">
                        <i className="fas fa-book-open text-sm"></i>
                    </div>
                    <span>Manga<span className="text-orange-500">Hay</span></span>
                </Link>
                
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            {/* Nút chuông thông báo (Màu cam thay vì đỏ) */}
                            <button className="relative p-2 text-gray-500 hover:text-orange-500 transition rounded-full hover:bg-orange-50">
                                <i className="fas fa-bell text-xl"></i>
                                <span className="absolute top-1 right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 text-[9px] text-white items-center justify-center font-bold">
                                        11
                                    </span>
                                </span>
                            </button>

                            {/* Dropdown User */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 focus:outline-none transition hover:opacity-80 p-1 border border-transparent hover:border-gray-200 rounded-full">
                                        <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                    </button>
                                </Dropdown.Trigger>
                                
                                {/* Cập nhật Dropdown mang phong cách phẳng, hover màu cam */}
                                <Dropdown.Content align="right" width="48" contentClasses="py-2 bg-white text-gray-700 border border-gray-100 shadow-xl rounded-lg mt-2">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 font-medium">{user.so_du_coin || 0} Coin</p>
                                    </div>

                                    <Dropdown.Link href={route('profile.edit')} className="hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 py-2 px-4 text-sm transition font-medium">
                                        <i className="fas fa-user w-4 text-center"></i> Tài khoản
                                    </Dropdown.Link>
                                    
                                    <Dropdown.Link href="#" className="hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 py-2 px-4 text-sm transition font-medium">
                                        <i className="fas fa-bookmark w-4 text-center"></i> Đang theo dõi
                                    </Dropdown.Link>
                                    
                                    <Dropdown.Link href="#" className="hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 py-2 px-4 text-sm transition font-medium">
                                        <i className="fas fa-history w-4 text-center"></i> Lịch sử đọc
                                    </Dropdown.Link>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>

                                    {/* Nút Admin & Đăng xuất */}
                                    {user.role_id === 1 && (
                                        <Dropdown.Link href={route('admin.dashboard')} className="hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 py-2 px-4 text-sm transition font-semibold text-orange-500">
                                            <i className="fas fa-cog w-4 text-center"></i> Quản trị viên
                                        </Dropdown.Link>
                                    )}
                                    
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="hover:bg-red-50 hover:text-red-600 w-full text-left flex items-center gap-3 py-2 px-4 text-sm transition font-medium text-red-500">
                                        <i className="fas fa-sign-out-alt w-4 text-center"></i> Đăng xuất
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Link href={route('login')} className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-md font-semibold transition text-sm">Đăng nhập</Link>
                            <Link href={route('register')} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold transition shadow-sm text-sm">Đăng ký</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}