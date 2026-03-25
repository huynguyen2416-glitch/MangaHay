import React, { useState, useRef, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; 

export default function CreateChap({ auth, truyens }) {
    // 1. Form state với Inertia.js
    const params = new URLSearchParams(window.location.search);
    const defaultMangaId = params.get('manga_id') || '';
    const { data, setData, post, processing, errors } = useForm({
        id_manga: defaultMangaId, // Tự động điền ID truyện nếu có trên URL
        tieu_de: '',
        so_chuong: '',
        noi_dung: [],
    });
    // 2. Logic cho tính năng xem trước & Kéo thả ảnh
    const [previewImages, setPreviewImages] = useState([]);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    // Khi chọn thêm ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            id: Math.random().toString(36).substring(2, 9),
            url: URL.createObjectURL(file), // Tạo link tạm để xem ảnh
            file: file // Giữ lại file gốc
        }));
        setPreviewImages([...previewImages, ...newImages]);
    };

    // Xoá ảnh nếu chọn nhầm
    const removeImage = (indexToRemove) => {
        const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);
        setPreviewImages(newPreviews);
    };

    // Sắp xếp lại ảnh khi kéo thả
    const handleSort = () => {
        let _previewImages = [...previewImages];
        const draggedItemContent = _previewImages.splice(dragItem.current, 1)[0];
        _previewImages.splice(dragOverItem.current, 0, draggedItemContent);
        
        dragItem.current = null;
        dragOverItem.current = null;
        setPreviewImages(_previewImages);
    };

    // Mỗi lần thay đổi thứ tự/thêm/xoá ảnh -> Cập nhật lại vào data.noi_dung
    useEffect(() => {
        const sortedFiles = previewImages.map(item => item.file);
        setData('noi_dung', sortedFiles);
    }, [previewImages]);

    // 3. Gửi dữ liệu
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra xem đã có ảnh chưa
        if (data.noi_dung.length === 0) {
            alert("Vui lòng chọn ít nhất 1 trang truyện!");
            return;
        }
        post(route('admin.chap.store'));
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Thêm Chapter Mới</h2>}>
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Chọn bộ truyện */}
                            <div>
                            <label className="block text-sm font-medium text-gray-700">Chọn bộ truyện</label>
                            <select 
                                value={data.id_manga} 
                                onChange={e => setData('id_manga', e.target.value)}
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${defaultMangaId ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                required
                                disabled={!!defaultMangaId} /* Khóa ô này nếu đã có ID từ URL */
                            >
                                <option value="">-- Chọn truyện --</option>
                                {truyens.map(t => (
                                    <option key={t.id} value={t.id}>{t.ten_truyen}</option>
                                ))}
                            </select>
                            {/* Gợi ý cho Admin biết */}
                            {defaultMangaId && (
                                <p className="text-sm text-orange-600 mt-2 font-medium">
                                    <i className="fas fa-info-circle mr-1"></i> Chapter này sẽ được thêm tự động vào truyện bạn vừa chọn.
                                </p>
                            )}
                            {errors.id_manga && <div className="text-red-500 text-sm mt-1">{errors.id_manga}</div>}
                        </div>

                            {/* Tên Chapter và Số chương */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tên Chapter (VD: Chapter 1 - Mở đầu)</label>
                                    <input 
                                        type="text" 
                                        value={data.tieu_de} 
                                        onChange={e => setData('tieu_de', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                    {errors.tieu_de && <div className="text-red-500 text-sm mt-1">{errors.tieu_de}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Số thứ tự chương (VD: 1, 1.5, 2)</label>
                                    <input 
                                        type="number" 
                                        step="1"
                                        value={data.so_chuong} 
                                        onChange={e => setData('so_chuong', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                    {errors.so_chuong && <div className="text-red-500 text-sm mt-1">{errors.so_chuong}</div>}
                                </div>
                            </div>

                            {/* Link ảnh & Kéo thả  */}
                            <div className="border-t pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload danh sách trang truyện</label>
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50 cursor-pointer"
                                />
                                <p className="text-xs text-gray-500 mb-4">Bạn có thể chọn thêm nhiều lần. Kéo thả các ảnh bên dưới để sắp xếp lại thứ tự.</p>
                                {errors.noi_dung && <div className="text-red-500 text-sm mt-1 mb-2">{errors.noi_dung}</div>}

                                {/* Khu vực hiển thị và kéo thả */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-gray-100 border-2 border-dashed border-gray-300 min-h-[150px] rounded-lg">
                                    {previewImages.length === 0 && (
                                        <div className="col-span-full text-center text-gray-400 py-6">
                                            Chưa có trang truyện nào được chọn.
                                        </div>
                                    )}

                                    {previewImages.map((item, index) => (
                                        <div 
                                            key={item.id}
                                            draggable
                                            onDragStart={() => (dragItem.current = index)}
                                            onDragEnter={() => (dragOverItem.current = index)}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                            className="relative cursor-move border-2 border-transparent hover:border-blue-500 transition shadow-sm bg-white p-1 rounded group"
                                        >
                                            {/* Số thứ tự trang */}
                                            <div className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded opacity-80 z-10">
                                                {index + 1}
                                            </div>

                                            {/* Nút xoá (ẩn, hiện khi rê chuột) */}
                                            <button 
                                                type="button" 
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition z-10 flex items-center justify-center text-sm font-bold"
                                            >
                                                ✕
                                            </button>

                                            {/* Hình ảnh */}
                                            <img 
                                                src={item.url} 
                                                alt={`Trang ${index + 1}`} 
                                                className="w-full h-32 object-cover rounded pointer-events-none" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <Link href={route('admin.chap.index')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
                                    Hủy bỏ
                                </Link>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50">
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