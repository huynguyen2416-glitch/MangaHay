import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Form({ user, roles }) {
    // 1. Thêm sdt và so_du_coin vào state
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role_id: user?.role_id || 2,
        sdt: user?.sdt || '',
        so_du_coin: user?.so_du_coin || 0,
    });

    const isEditing = !!user;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.users.update', user.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Sửa Người dùng' : 'Thêm Người dùng'} />
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold text-gray-800 text-lg">
                        <i className="fas fa-user-edit text-orange-500 mr-2"></i>
                        {isEditing ? 'Sửa thông tin: ' + user.name : 'Thêm người dùng mới'}
                    </h2>
                    <Link href={route('admin.users.index')} className="text-sm text-gray-500 hover:text-orange-500 transition">
                        <i className="fas fa-arrow-left"></i> Quay lại
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Chia form làm 2 cột trên màn hình lớn */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Cột 1: Thông tin cơ bản */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Tài khoản</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border-gray-300 rounded-lg focus:ring-orange-500"
                                    value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input type="email" className="w-full border-gray-300 rounded-lg focus:ring-orange-500"
                                    value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {isEditing ? 'Đổi Mật khẩu (Bỏ trống nếu giữ nguyên)' : 'Mật khẩu *'}
                                </label>
                                <input type="password" className="w-full border-gray-300 rounded-lg focus:ring-orange-500"
                                    value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>
                        </div>

                        {/* Cột 2: Thông tin mở rộng */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2">Thông tin bổ sung</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (Giao hàng)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-phone text-gray-400"></i>
                                    </div>
                                    <input type="text" className="w-full pl-10 border-gray-300 rounded-lg focus:ring-orange-500"
                                        placeholder="09xx..." value={data.sdt} onChange={(e) => setData('sdt', e.target.value)} />
                                </div>
                                {errors.sdt && <div className="text-red-500 text-xs mt-1">{errors.sdt}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số dư Coin (Nạp điểm)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-coins text-yellow-500"></i>
                                    </div>
                                    <input type="number" min="0" className="w-full pl-10 border-gray-300 rounded-lg focus:ring-orange-500 font-bold text-orange-600"
                                        value={data.so_du_coin} onChange={(e) => setData('so_du_coin', e.target.value)} />
                                </div>
                                {errors.so_du_coin && <div className="text-red-500 text-xs mt-1">{errors.so_du_coin}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cấp bậc / Phân quyền <span className="text-red-500">*</span></label>
                                <select className="w-full border-gray-300 rounded-lg focus:ring-orange-500"
                                    value={data.role_id} onChange={(e) => setData('role_id', e.target.value)}>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.ten_vaitro}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Nút Submit */}
                    <div className="pt-6 mt-6 border-t flex justify-end">
                        <button type="submit" disabled={processing}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition-all disabled:opacity-50 flex items-center gap-2">
                            {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                            {processing ? 'Đang lưu...' : 'Lưu dữ liệu'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}