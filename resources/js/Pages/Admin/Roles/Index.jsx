import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ roles }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa vai trò này? Cảnh báo: Việc này có thể ảnh hưởng đến các user đang giữ vai trò này!')) {
            destroy(route('admin.roles.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Quản lý Phân quyền" />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold text-gray-800 text-lg">Danh sách Vai trò (Roles)</h2>
                    <Link 
                        href={route('admin.roles.create')} 
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i> Thêm Vai trò
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                                <th className="px-6 py-3 font-medium w-16 text-center">ID</th>
                                <th className="px-6 py-3 font-medium">Tên Vai trò</th>
                                <th className="px-6 py-3 font-medium">Mô tả chi tiết</th>
                                <th className="px-6 py-3 font-medium text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {roles.map((role) => (
                                <tr key={role.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4 text-center font-medium text-gray-500">
                                        #{role.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded text-xs font-bold ${role.id === 1 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {role.ten_vaitro}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {role.description || 'Không có mô tả'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {/* Nút Sửa */}
                                        <Link href={route('admin.roles.edit', role.id)} className="text-blue-500 hover:text-blue-700 mx-2 transition">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        
                                        {/* Nút Xóa (Không cho phép xóa Admin - ID 1 và User mặc định - ID 4) */}
                                        {(role.id !== 1 && role.id !== 4) && (
                                            <button onClick={() => handleDelete(role.id)} className="text-red-500 hover:text-red-700 mx-2 transition">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}