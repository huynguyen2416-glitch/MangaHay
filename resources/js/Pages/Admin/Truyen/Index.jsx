import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ truyens }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa bộ truyện này không? Toàn bộ chapter cũng sẽ bị xóa!')) {
            destroy(route('admin.truyen.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Quản lý Truyện" />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold text-gray-800 text-lg">Danh sách Truyện</h2>
                    <Link 
                        href={route('admin.truyen.create')} 
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i> Thêm Truyện
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                                <th className="px-6 py-3 font-medium text-center w-16">ID</th>
                                <th className="px-6 py-3 font-medium text-center w-24">Ảnh Bìa</th>
                                <th className="px-6 py-3 font-medium">Tên Truyện</th>
                                <th className="px-6 py-3 font-medium text-center">Trạng thái</th>
                                <th className="px-6 py-3 font-medium text-center">Ngày tạo</th>
                                <th className="px-6 py-3 font-medium text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {truyens.data && truyens.data.length > 0 ? (
                                truyens.data.map((manga) => (
                                    <tr key={manga.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 text-center font-medium text-gray-600">{manga.id}</td>
                                        
                                        <td className="px-6 py-4 flex justify-center">
                                            <div className="w-12 h-16 shadow-sm border border-gray-200 overflow-hidden rounded bg-gray-100">
                                                <img 
                                                    src={manga.anh_bia || 'https://via.placeholder.com/150x200?text=No+Cover'} 
                                                    alt="bìa" 
                                                    className="w-full h-full object-cover" 
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover'; }}
                                                />
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            {manga.ten_truyen}
                                        </td>
                                        
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                manga.trang_thai === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                                                manga.trang_thai === 'Tạm ngưng' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {manga.trang_thai || 'Đang tiến hành'}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-center text-gray-500">
                                            {new Date(manga.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        
                                        <td className="px-6 py-4 text-center">
                                            <Link 
                                                href={route('admin.chap.index', { manga_id: manga.id })} 
                                                className="text-orange-500 hover:text-orange-700 mx-2 transition"
                                                title="Quản lý Chapter"
                                            >
                                                <i className="fas fa-list"></i>
                                            </Link>
                                            <Link 
                                                href={route('admin.truyen.edit', manga.id)} 
                                                className="text-blue-500 hover:text-blue-700 mx-2 transition" 
                                                title="Sửa"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(manga.id)} 
                                                className="text-red-500 hover:text-red-700 mx-2 transition" 
                                                title="Xóa"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400 bg-gray-50/50">
                                        <div className="flex flex-col items-center justify-center">
                                            <i className="fas fa-folder-open text-4xl mb-3 text-gray-300"></i>
                                            <p>Chưa có truyện nào trong cơ sở dữ liệu.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {truyens.links && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-white">
                        <Pagination links={truyens.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}