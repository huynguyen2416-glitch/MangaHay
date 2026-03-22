import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ role }) {
    const { data, setData, put, errors, processing } = useForm({
        ten_vaitro: role.ten_vaitro || '',
        trang_thai: role.trang_thai === 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.roles.update', role.id));
    };

    return (
        <AdminLayout>
            <Head title={`Sửa Vai trò: ${role.name}`} />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-800 text-lg">Chỉnh sửa Vai trò</h2>
                    <Link href={route('admin.roles.index')} className="text-gray-500 hover:text-gray-700 text-sm">
                        <i className="fas fa-arrow-left mr-1"></i> Quay lại
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên Vai trò</label>
                        <input 
                            type="text" 
                            value={data.ten_vaitro}
                            onChange={(e) => setData('ten_vaitro', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-gray-50"
                            // Nếu là Admin (id=1), không cho phép đổi tên để tránh lỗi hệ thống
                            readOnly={role.id === 1} 
                        />
                        {errors.ten_vaitro && <p className="text-red-500 text-xs mt-1">{errors.ten_vaitro}</p>}
                        {role.id === 1 && <p className="text-orange-500 text-xs mt-1"><i className="fas fa-info-circle"></i> Không thể đổi tên vai trò Quản trị viên cao nhất.</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái Vai trò</label>
                        
                        <div 
                            className="flex items-center gap-3 cursor-pointer w-max"
                            onClick={() => setData('trang_thai', !data.trang_thai)}
                        >
                            {/* Nút gạt */}
                            <button
                                type="button"
                                role="switch"
                                aria-checked={data.trang_thai}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                    data.trang_thai ? 'bg-orange-500' : 'bg-gray-300'
                                }`}
                            >
                                <span 
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                                        data.trang_thai ? 'translate-x-6' : 'translate-x-1'
                                    }`} 
                                />
                            </button>

                            {/* Chữ hiển thị kế bên */}
                            <span className={`text-sm font-bold select-none ${data.trang_thai ? 'text-orange-600' : 'text-gray-400'}`}>
                                {data.trang_thai ? (
                                    <><i className="fas fa-check-circle mr-1"></i> Đang hoạt động</>
                                ) : (
                                    <><i className="fas fa-lock mr-1"></i> Tạm khóa</>
                                )}
                            </span>
                        </div>
                        
                        {errors.trang_thai && <p className="text-red-500 text-xs mt-1">{errors.trang_thai}</p>}
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 disabled:opacity-70"
                        >
                            <i className="fas fa-save"></i> {processing ? 'Đang cập nhật...' : 'Cập nhật'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}