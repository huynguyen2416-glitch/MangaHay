import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500 font-medium">
                <p>
                    © 2026 Manga<span className="text-orange-500">Hay</span> Admin.
                </p>
                <p className="text-xs text-gray-400">
                    Phiên bản quản trị hệ thống.
                </p>
            </div>
        </footer>
    );
}