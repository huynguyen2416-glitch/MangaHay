import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Tổng quan Admin" />

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Thống kê nhanh</h1>

            {/* Cụm 4 thẻ thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tổng số Truyện</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Chương (Chapter)</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">15,890</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Thành viên</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">8,932</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Lượt xem hôm nay</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">45.2K</p>
                </div>

            </div>

            {/* Bảng dữ liệu demo */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Truyện mới cập nhật gần đây</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="uppercase tracking-wider border-b-2 bg-gray-50 border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-6 py-3 border-b">Tên truyện</th>
                                <th className="px-6 py-3 border-b">Người đăng</th>
                                <th className="px-6 py-3 border-b">Trạng thái</th>
                                <th className="px-6 py-3 border-b">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 border-b border-gray-100">
                                <td className="px-6 py-4 font-semibold text-orange-600">Chú Thuật Hồi Chiến</td>
                                <td className="px-6 py-4">Admin Tối Cao</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Đang tiến hành</span></td>
                                <td className="px-6 py-4"><button className="text-blue-500 hover:underline">Sửa</button></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-semibold text-orange-600">Doraemon</td>
                                <td className="px-6 py-4">Admin Tối Cao</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Hoàn thành</span></td>
                                <td className="px-6 py-4"><button className="text-blue-500 hover:underline">Sửa</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </AdminLayout>
    );
}