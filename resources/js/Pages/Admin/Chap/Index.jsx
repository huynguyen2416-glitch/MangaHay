import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, chaps }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa chapter này không?')) {
            destroy(route('admin.chap.destroy', id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quản lý Chapter</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-4 flex justify-end">
                        <Link href={route('admin.chap.create')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            + Thêm Chapter Mới
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 overflow-x-auto">
                            <table className="min-w-full table-auto text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border">ID</th>
                                        <th className="px-4 py-2 border">Thuộc Truyện</th>
                                        <th className="px-4 py-2 border">Tên Chap</th>
                                        <th className="px-4 py-2 border">Số chương</th>
                                        <th className="px-4 py-2 border text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chaps.data && chaps.data.length > 0 ? (
                                        chaps.data.map((chap) => (
                                            <tr key={chap.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 border">{chap.id}</td>
                                                <td className="px-4 py-2 border font-semibold text-blue-600">
                                                    {chap.truyen ? chap.truyen.ten_truyen : 'Truyện đã xóa'}
                                                </td>
                                                <td className="px-4 py-2 border">{chap.tieu_de}</td>
                                                <td className="px-4 py-2 border">{chap.so_chuong}</td>
                                                <td className="px-4 py-2 border text-center space-x-2">
                                                    <Link href={route('admin.chap.edit', chap.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                                                        Sửa
                                                    </Link>
                                                    <button onClick={() => handleDelete(chap.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-gray-500">Chưa có chapter nào.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}