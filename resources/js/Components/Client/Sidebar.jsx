import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-full space-y-6">
            {/* Box Top Truyện */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Thanh gạch ngang trang trí ở trên cùng */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
                
                <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-fire text-orange-500"></i> Nổi bật nhất
                </h3>
                
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 group">
                        <span className="text-xl font-black text-gray-300 group-hover:text-orange-500 transition-colors">01</span>
                        <Link href="#" className="font-medium text-gray-700 group-hover:text-orange-500 transition-colors line-clamp-1">
                            Chú Thuật Hồi Chiến
                        </Link>
                    </li>
                    <li className="flex items-center gap-3 group">
                        <span className="text-xl font-black text-gray-300 group-hover:text-orange-500 transition-colors">02</span>
                        <Link href="#" className="font-medium text-gray-700 group-hover:text-orange-500 transition-colors line-clamp-1">
                            Solo Leveling
                        </Link>
                    </li>
                    <li className="flex items-center gap-3 group">
                        <span className="text-xl font-black text-gray-300 group-hover:text-orange-500 transition-colors">03</span>
                        <Link href="#" className="font-medium text-gray-700 group-hover:text-orange-500 transition-colors line-clamp-1">
                            One Piece
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}