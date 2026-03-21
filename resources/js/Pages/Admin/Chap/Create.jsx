import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ auth, truyens }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        id_manga: '',
        ten_chap: '',
        so_chuong: '',
        noi_dung: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.chap.store'), {
            forceFormData: true, 
        });
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Thêm Chapter Mới</h2>}>
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Chọn bộ truyện */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Chọn bộ truyện</label>
                                <select 
                                    value={data.id_manga} 
                                    onChange={e => setData('id_manga', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">-- Chọn truyện --</option>
                                    {truyens.map(t => (
                                        <option key={t.id} value={t.id}>{t.ten_truyen}</option>
                                    ))}
                                </select>
                                {errors.id_manga && <div className="text-red-500 text-sm mt-1">{errors.id_manga}</div>}
                            </div>

                            {/* Tên Chapter và Số chương */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tên Chapter (VD: Chapter 1 - Mở đầu)</label>
                                    <input 
                                        type="text" 
                                        value={data.ten_chap} 
                                        onChange={e => setData('ten_chap', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                    {errors.ten_chap && <div className="text-red-500 text-sm mt-1">{errors.ten_chap}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Số thứ tự chương (VD: 1, 1.5, 2)</label>
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={data.so_chuong} 
                                        onChange={e => setData('so_chuong', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                    {errors.so_chuong && <div className="text-red-500 text-sm mt-1">{errors.so_chuong}</div>}
                                </div>
                            </div>

                            {/* Link ảnh */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload danh sách trang truyện</label>
                                <input 
                                    type="file" 
                                    multiple // Cho phép chọn nhiều file (Ctrl + Click hoặc bôi đen)
                                    accept="image/*"
                                    onChange={(e) => setData('noi_dung', Array.from(e.target.files))} // Chuyển danh sách file thành mảng
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Giữ phím Ctrl (hoặc Cmd) / Bôi đen để chọn nhiều ảnh cùng lúc.</p>
                                {errors.noi_dung && <div className="text-red-500 text-sm mt-1">{errors.noi_dung}</div>}
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                                    {processing ? 'Đang lưu...' : 'Lưu Chapter'}
                                </button>
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <Link href={route('admin.chap.index')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                                    Hủy bỏ
                                </Link>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    {processing ? 'Đang lưu...' : 'Lưu Chapter'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}