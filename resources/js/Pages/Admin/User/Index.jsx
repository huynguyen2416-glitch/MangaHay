import React from 'react';
import { Head, Link, useForm , router} from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination'; // Import chuẩn

export default function Index({ users }) {
    // Dùng form chỉ để gọi hàm delete cho bảo mật
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            destroy(route('admin.users.destroy', id));
        }
    };
    const handleToggleStatus = (id) => {
    router.patch(route('admin.users.toggle_status', id), {}, {
        preserveScroll: true, // Giữ nguyên vị trí cuộn trang, không bị giật lên đầu
    });
};
    return (
        <AdminLayout>
            <Head title="Quản lý User" />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold text-gray-800 text-lg">Danh sách Người dùng</h2>
                    <Link 
                        href={route('admin.users.create')} 
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i> Thêm User
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                                <th className="px-6 py-3 font-medium">Tên / Email</th>
                                <th className="px-6 py-3 font-medium">Vai trò</th>
                                <th className="px-6 py-3 font-medium text-right">Số dư Coin</th>
                                <th className="px-6 py-3 font-medium text-center">Trạng thái</th>
                                <th className="px-6 py-3 font-medium text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {users.data.map((u) => (
                                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{u.name}</div>
                                        <div className="text-gray-500 text-xs">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.role_id === 1 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {u.role_name || (u.role_id === 1 ? 'Admin' : 'User')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold text-yellow-500">
                                        {u.so_du_coin} <i className="fas fa-coins text-xs"></i>
                                    </td>
                                    
                                    {/* Cột Trạng thái */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center justify-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleStatus(u.id)} 
                                                disabled={u.id === 1} 
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                                                    u.trang_thai ? 'bg-orange-500' : 'bg-gray-300' 
                                                } ${u.id === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <span 
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                                                        u.trang_thai ? 'translate-x-6' : 'translate-x-1' 
                                                    }`} 
                                                />
                                            </button>
                                            <span className={`text-xs font-bold ${u.trang_thai ? 'text-orange-600' : 'text-gray-500'}`}>
                                                {u.trang_thai ? 'Hoạt động' : 'Đã khóa'}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Cột Hành động (Sửa / Xóa) */}
                                    <td className="px-6 py-4 text-center">
                                        <Link href={route('admin.users.edit', u.id)} className="text-blue-500 hover:text-blue-700 mx-2 transition">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        {u.id !== 1 && (
                                            <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 mx-2 transition">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-white">
                    <Pagination links={users.links} />
                </div>
            </div>
        </AdminLayout>
    );
}