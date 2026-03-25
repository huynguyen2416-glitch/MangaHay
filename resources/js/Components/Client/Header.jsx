import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Header() {
    const { auth } = usePage().props;
    const user = auth?.user; 

    // Lấy keyword từ URL (nếu có) để giữ lại text trong ô tìm kiếm khi load xong
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('search')) {
            setKeyword(params.get('search'));
        }
    }, []);

    // Hàm xử lý khi bấm Enter hoặc icon kính lúp
    const handleSearch = (e) => {
        e.preventDefault();
        // Luôn điều hướng về trang chủ '/' kèm theo từ khóa tìm kiếm
        if (keyword.trim()) {
            router.get('/', { search: keyword });
        } else {
            router.get('/'); // Nếu để trống thì về trang chủ bình thường
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center justify-between p-3 w-full max-w-7xl mx-auto gap-4">
                
                {/* 1. Logo  */}
                <Link href="/" className="text-2xl font-black tracking-tight text-gray-800 flex items-center gap-1 shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white">
                        <i className="fas fa-book-open text-sm"></i>
                    </div>
                    <span className="hidden sm:block">Manga<span className="text-orange-500">Hay</span></span>
                </Link>
                
                {/* 2. THANH TÌM KIẾM (Nằm ở giữa) */}
                <div className="flex-1 max-w-2xl mx-auto">
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm truyện, tác giả..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full bg-gray-100/80 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-full py-2 pl-5 pr-12 text-sm transition-all shadow-inner placeholder-gray-400"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>

                {/* 3. Khu vực User (Bên phải) */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    {user ? (
                        <>
                            {/* Nút chuông thông báo */}
                            <button className="relative p-2 text-gray-500 hover:text-orange-500 transition rounded-full hover:bg-orange-50 hidden sm:block">
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
                            <Link href={route('login')} className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md font-semibold transition text-sm">Đăng nhập</Link>
                            <Link href={route('register')} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md font-semibold transition shadow-sm text-sm hidden sm:block">Đăng ký</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}