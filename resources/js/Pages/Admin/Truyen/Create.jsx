import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ auth }) {
    // Khởi tạo form với các trường khớp với Database của bạn
    const { data, setData, post, processing, errors } = useForm({
        ten_truyen: '',
        anh_bia: '',
        mo_ta: '',
        // Thêm các trường khác nếu DB bạn yêu cầu (VD: tac_gia, trang_thai)
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu lên TruyenController@store
        post(route('admin.truyen.store'));
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Thêm Truyện Mới</h2>}
        >
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Tên truyện */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên Truyện</label>
                                <input 
                                    type="text" 
                                    value={data.ten_truyen}
                                    onChange={(e) => setData('ten_truyen', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập tên truyện..."
                                    required
                                />
                                {errors.ten_truyen && <div className="text-red-500 text-sm mt-1">{errors.ten_truyen}</div>}
                            </div>

                            {/* Ảnh bìa */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ảnh Bìa</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setData('anh_bia', e.target.files[0])} // Lấy file đầu tiên
                                    className="mt-1 block w-full"
                                />
                            </div>

                            {/* Tóm tắt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tóm tắt nội dung</label>
                                <textarea 
                                    rows="5"
                                    value={data.mo_ta}
                                    onChange={(e) => setData('mo_ta', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập tóm tắt..."
                                ></textarea>
                                {errors.mo_ta && <div className="text-red-500 text-sm mt-1">{errors.mo_ta}</div>}
                            </div>

                            {/* Nút hành động */}
                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <Link 
                                    href={route('admin.truyen.index')} 
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Hủy bỏ
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Đang lưu...' : 'Lưu Truyện'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}