import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';

export default function Index({ chaps, filters }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa chapter này không?')) {
            destroy(route('admin.chap.destroy', id));
        }
    };

    const filterByManga = (mangaId) => {
        router.get(route('admin.chap.index'), { manga_id: mangaId });
    };

    const clearFilter = () => {
        router.get(route('admin.chap.index'));
    };

    return (
        <AdminLayout>
            <Head title="Quản lý Chapter" />
            
            {/* Hộp thoại thông báo khi đang lọc  */}
            {filters?.manga_id && (
                <div className="mb-4 bg-orange-50 text-orange-700 px-6 py-3 rounded-xl border border-orange-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center">
                        <i className="fas fa-filter mr-3 text-orange-400"></i>
                        <span>Đang hiển thị các chương của truyện có ID: <strong className="font-black">{filters.manga_id}</strong></span>
                    </div>
                    <button 
                        onClick={clearFilter}
                        className="text-sm bg-orange-200 hover:bg-orange-300 px-3 py-1.5 rounded-lg transition-colors text-orange-800 font-bold"
                    >
                        <i className="fas fa-times mr-1"></i> Bỏ lọc
                    </button>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold text-gray-800 text-lg">Danh sách Chapter</h2>
                    <Link 
                        href={route('admin.chap.create', filters?.manga_id ? { manga_id: filters.manga_id } : {})} 
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i> Thêm Chapter
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                                <th className="px-6 py-3 font-medium text-center w-16">ID</th>
                                <th className="px-6 py-3 font-medium">Thuộc Truyện</th>
                                <th className="px-6 py-3 font-medium">Số Chương</th>
                                <th className="px-6 py-3 font-medium">Tiêu Đề Chap</th>
                                <th className="px-6 py-3 font-medium text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {chaps.data && chaps.data.length > 0 ? (
                                chaps.data.map((chap) => (
                                    <tr key={chap.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 text-center font-medium text-gray-600">{chap.id}</td>
                                        
                                        <td className="px-6 py-4">
                                            {chap.truyen ? (
                                                <button 
                                                    onClick={() => filterByManga(chap.truyen.id)}
                                                    className="text-orange-500 hover:text-orange-700 font-semibold transition-colors text-left flex items-center gap-2"
                                                    title="Lọc chương theo truyện này"
                                                >
                                                    <i className="fas fa-book text-orange-300"></i>
                                                    {chap.truyen.ten_truyen}
                                                </button>
                                            ) : (
                                                <span className="text-red-500 italic">Truyện đã xóa</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            Chương {chap.so_chuong}
                                        </td>
                                        
                                        <td className="px-6 py-4 text-gray-600">
                                            {chap.tieu_de || <span className="text-gray-400 italic">Không có tiêu đề</span>}
                                        </td>
                                        
                                        <td className="px-6 py-4 text-center">
                                            <Link href={route('admin.chap.edit', chap.id)} className="text-blue-500 hover:text-blue-700 mx-2 transition" title="Sửa">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(chap.id)} className="text-red-500 hover:text-red-700 mx-2 transition" title="Xóa">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-400 bg-gray-50/50">
                                        <div className="flex flex-col items-center justify-center">
                                            <i className="fas fa-file-excel text-4xl mb-3 text-gray-300"></i>
                                            <p>Chưa có chapter nào hoặc không tìm thấy kết quả.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {chaps.links && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-white">
                        <Pagination links={chaps.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}