import React, { useState, useRef, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; 

export default function EditChap({ auth, truyens, chap }) {
    
    // ==========================================
    // 1. LOGIC DEMO ẢNH (PREVIEW CŨ & MỚI)
    // ==========================================
    
    // Đọc danh sách ảnh cũ từ Database
    const oldImages = chap.danh_sach_anh ? JSON.parse(chap.danh_sach_anh) : [];

    // Khởi tạo Preview với các ảnh CŨ đã có sẵn
    const [previewImages, setPreviewImages] = useState(
        oldImages.map((url) => ({
            id: 'old_' + Math.random().toString(36).substring(2, 9),
            url: url,       // Link ảnh cũ để hiển thị demo (VD: /images/chaps/...)
            file: url,      // Gán file = chuỗi link để gửi lại server
            isOld: true     // Đánh dấu đây là ảnh cũ
        }))
    );

    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    // Khi người dùng chọn THÊM ảnh MỚI từ máy tính
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            id: 'new_' + Math.random().toString(36).substring(2, 9),
            url: URL.createObjectURL(file), // Tạo link demo cho ảnh mới
            file: file,                     // File thật để upload
            isOld: false                    // Đánh dấu đây là ảnh mới
        }));
        
        // Nối ảnh mới vào sau danh sách ảnh cũ đang hiển thị
        setPreviewImages([...previewImages, ...newImages]);
    };

    // Xoá ảnh khỏi khung demo (Dù là ảnh cũ hay mới)
    const removeImage = (indexToRemove) => {
        const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);
        setPreviewImages(newPreviews);
    };

    // Kéo thả sắp xếp lại thứ tự demo
    const handleSort = () => {
        let _previewImages = [...previewImages];
        const draggedItemContent = _previewImages.splice(dragItem.current, 1)[0];
        _previewImages.splice(dragOverItem.current, 0, draggedItemContent);
        
        dragItem.current = null;
        dragOverItem.current = null;
        setPreviewImages(_previewImages);
    };

    // ==========================================
    // 2. QUẢN LÝ FORM DATA
    // ==========================================

    const { data, setData, post, processing, errors } = useForm({
        id_manga: chap.id_manga || '',
        tieu_de: chap.tieu_de || '', 
        so_chuong: chap.so_chuong || '',
        noi_dung: [], 
        _method: 'PUT', 
    });

    // Cập nhật dữ liệu vào biến form mỗi khi kéo thả đổi thứ tự
    useEffect(() => {
        const finalData = previewImages.map(item => item.file);
        setData('noi_dung', finalData);
    }, [previewImages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.noi_dung.length === 0) {
            alert("Vui lòng chọn ít nhất 1 trang truyện!");
            return;
        }
        post(route('admin.chap.update', chap.id));
    };

    // ==========================================
    // 3. GIAO DIỆN
    // ==========================================

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Chỉnh sửa Chapter</h2>}>
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
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

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tiêu đề Chapter</label>
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
                                    <label className="block text-sm font-medium text-gray-700">Số thứ tự chương</label>
                                    <input 
                                        type="number" step="1" 
                                        value={data.so_chuong} 
                                        onChange={e => setData('so_chuong', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                    {errors.so_chuong && <div className="text-red-500 text-sm mt-1">{errors.so_chuong}</div>}
                                </div>
                            </div>

                            {/* KHU VỰC HIỂN THỊ DEMO ẢNH */}
                            <div className="border-t pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Thêm trang truyện mới (Tuỳ chọn)</label>
                                <input 
                                    type="file" multiple accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full border border-gray-300 p-2 rounded-md mb-2 bg-gray-50 cursor-pointer"
                                />
                                <p className="text-xs text-gray-500 mb-4">Các ảnh hiện tại của chương. Bạn có thể kéo thả để đổi vị trí cũ/mới, hoặc bấm X để xoá.</p>
                                {errors.noi_dung && <div className="text-red-500 text-sm mt-1 mb-2">{errors.noi_dung}</div>}

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-6 p-4 bg-gray-100 border-2 border-dashed border-gray-300 min-h-[150px] rounded-lg">
                                    {previewImages.map((item, index) => (
                                        <div 
                                            key={item.id} draggable
                                            onDragStart={() => (dragItem.current = index)}
                                            onDragEnter={() => (dragOverItem.current = index)}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`relative cursor-move border-2 transition shadow-sm bg-white p-1 rounded group ${item.isOld ? 'border-gray-300 hover:border-blue-500' : 'border-green-400 hover:border-green-600'}`}
                                        >
                                            {/* Số thứ tự */}
                                            <div className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded opacity-80 z-10">{index + 1}</div>
                                            
                                            {/* Chú thích ảnh Mới (Màu xanh) */}
                                            {!item.isOld && <div className="absolute bottom-1 left-1 bg-green-500 text-white text-[10px] px-1 rounded z-10">Mới tải lên</div>}

                                            {/* Nút Xoá */}
                                            <button 
                                                type="button" onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition z-10 flex items-center justify-center text-sm font-bold"
                                            >✕</button>

                                            {/* Ảnh Demo */}
                                            <img src={item.url} alt={`Trang ${index + 1}`} className="w-full h-128 object-cover rounded pointer-events-none" />
                                        </div>
                                    ))}
                                    
                                    {previewImages.length === 0 && (
                                        <div className="col-span-full text-center text-gray-400 py-6">
                                            Chưa có trang truyện nào.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 mt-6 border-t pt-4">
                                <Link href={route('admin.chap.index')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Hủy bỏ</Link>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50">
                                    {processing ? 'Đang cập nhật...' : 'Cập nhật Chapter'}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}