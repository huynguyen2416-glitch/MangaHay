import React from 'react';
import { Link, useForm } from '@inertiajs/react';

import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, truyens }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa bộ truyện này không? Toàn bộ chapter cũng sẽ bị xóa!')) {
            destroy(route('admin.truyen.destroy', id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quản lý Truyện</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Nút Thêm Truyện Mới */}
                    <div className="mb-4 flex justify-end">
                        <Link 
                            href={route('admin.truyen.create')} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Thêm Truyện Mới
                        </Link>
                    </div>

                    {/* Bảng Danh Sách */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 overflow-x-auto">
                            <table className="min-w-full table-auto text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border">ID</th>
                                        <th className="px-4 py-2 border">Ảnh Bìa</th>
                                        <th className="px-4 py-2 border">Tên Truyện</th>
                                        <th className="px-4 py-2 border">Ngày tạo</th>
                                        <th className="px-4 py-2 border text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {truyens.data && truyens.data.length > 0 ? (
                                        truyens.data.map((manga) => (
                                            <tr key={manga.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 border">{manga.id}</td>
                                                <td className="px-4 py-2 border">
                                                    <img src={manga.anh_bia || '/images/default.jpg'} alt="bìa" className="w-12 h-16 object-cover rounded" />
                                                </td>
                                                <td className="px-4 py-2 border font-semibold">{manga.ten_truyen}</td>
                                                <td className="px-4 py-2 border text-sm text-gray-500">
                                                    {new Date(manga.created_at).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="px-4 py-2 border text-center space-x-2">
                                                    <Link 
                                                        href={route('admin.truyen.edit', manga.id)} 
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Sửa
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(manga.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-gray-500">Chưa có truyện nào trong cơ sở dữ liệu.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            
                            {/* Nút Phân trang (Nếu có nhiều truyện) */}
                            <div className="mt-4">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}