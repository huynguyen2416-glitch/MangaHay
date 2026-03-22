import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ auth, truyen }) {
    // 1. Thay 'put' bằng 'post', thêm _method: 'put'
    const { data, setData, post, processing, errors } = useForm({
        ten_truyen: truyen.ten_truyen || '',
        tac_gia: truyen.tac_gia || '',
        anh_bia: null,
        mo_ta: truyen.mo_ta || '',
        _method: 'put', 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 2. Dùng post thay vì put
        post(route('admin.truyen.update', truyen.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sửa Truyện: {truyen.ten_truyen}</h2>}
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
                                    className="block w-full border border-gray-300 p-2 rounded-md bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                                    required
                                />
                                {errors.ten_truyen && <div className="text-red-500 text-sm mt-1">{errors.ten_truyen}</div>}
                            </div>
                            {/* Tên tác giả */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tên tác giả</label>
                                <input 
                                    type="text" 
                                    value={data.tac_gia} 
                                    onChange={e => setData('tac_gia', e.target.value)} 
                                    className="block w-full border border-gray-300 p-2 rounded-md bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Đang cập nhật..."
                                />
                                {errors.tac_gia && <div className="text-red-500 text-sm mt-1">{errors.tac_gia}</div>}
                            </div>
                            {/* Ảnh bìa */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Đổi Ảnh Bìa (Bỏ trống nếu giữ nguyên)</label>
                                {truyen.anh_bia && <img src={truyen.anh_bia} alt="Bìa cũ" className="w-20 h-auto mb-2 rounded" />}
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setData('anh_bia', e.target.files[0])}
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
                                    className="block w-full border border-gray-300 p-2 rounded-md bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                                ></textarea>
                                {errors.mo_ta && <div className="text-red-500 text-sm mt-1">{errors.mo_ta}</div>}
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <Link href={route('admin.truyen.index')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                                    Hủy bỏ
                                </Link>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                    {processing ? 'Đang cập nhật...' : 'Cập Nhật Truyện'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}