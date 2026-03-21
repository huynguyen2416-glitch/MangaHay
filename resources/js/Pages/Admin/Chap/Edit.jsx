import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ auth, chap, truyens }) {
    // Lấy danh sách ảnh cũ để hiển thị cho đẹp
    const existingImages = chap.noi_dung ? JSON.parse(chap.noi_dung) : [];

    const { data, setData, post, processing, errors } = useForm({
        id_manga: chap.id_manga || '',
        ten_chap: chap.ten_chap || '',
        so_chuong: chap.so_chuong || '',
        noi_dung: [], // Để mảng rỗng, nếu chọn file mới thì up đè
        _method: 'put', // Quan trọng: Đánh lừa Laravel
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.chap.update', chap.id), {
            forceFormData: true, // Quan trọng: Ép gửi file
        });
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sửa Chapter: {chap.ten_chap}</h2>}>
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Chọn bộ truyện */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Thuộc bộ truyện</label>
                                <select 
                                    value={data.id_manga} 
                                    onChange={e => setData('id_manga', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                                    <label className="block text-sm font-medium text-gray-700">Tên Chapter</label>
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
                                    <label className="block text-sm font-medium text-gray-700">Số thứ tự chương</label>
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
                                <label className="block text-sm font-medium text-gray-700">Tải lại danh sách ảnh (Bỏ trống nếu muốn giữ nguyên ảnh cũ)</label>
                                
                                {/* Hiện danh sách ảnh cũ đang có */}
                                {existingImages.length > 0 && (
                                    <div className="mb-3 p-3 bg-gray-50 border rounded text-sm text-gray-600">
                                        Đang có <b>{existingImages.length}</b> ảnh. Nếu bạn upload ảnh mới, toàn bộ ảnh cũ sẽ bị xóa.
                                    </div>
                                )}

                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*"
                                    onChange={(e) => setData('noi_dung', Array.from(e.target.files))}
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                                />
                                {errors.noi_dung && <div className="text-red-500 text-sm mt-1">{errors.noi_dung}</div>}
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <Link href={route('admin.chap.index')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                                    Hủy bỏ
                                </Link>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50">
                                    {processing ? 'Đang cập nhật...' : 'Cập Nhật Chapter'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}