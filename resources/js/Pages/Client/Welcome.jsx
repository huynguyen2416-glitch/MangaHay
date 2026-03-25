import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout'; 

export default function Welcome({ truyen }) {
    return (
        <ClientLayout>
            <Head title="Trang chủ" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-10">
                
                {/* Tiêu đề Section */}
                <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-orange-500 rounded mr-3"></div>
                    <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800">Truyện Mới Cập Nhật</h2>
                </div>

                {/* Danh sách truyện */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    
                    {truyen && truyen.length > 0 ? (
                        truyen.map((truyen) => (
                            <Link 
                                href={`/truyen/${truyen.id}`} 
                                key={truyen.id} 
                                className="group flex flex-col cursor-pointer"
                            >
                                {/* 1. PHẦN ẢNH BÌA (Ở TRÊN) */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200 bg-gray-200 border border-gray-100">
                                    <img 
                                        src={truyen.anh_bia} 
                                        alt={truyen.ten_truyen} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                                        }}
                                    />
                                    {/* Nhãn Chapter hiển thị đè lên góc phải của ảnh */}
                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-bold px-2 py-1 rounded shadow">
                                        {truyen.latestChapter ? `Chương ${truyen.latestChapter.so_chapter}` : 'Chưa có chapter'}
                                    </div>
                                </div>

                                {/* 2. PHẦN TÊN TRUYỆN (Ở DƯỚI) */}
                                <div className="mt-2 text-center sm:text-left">
                                    <h3 
                                        className="font-bold text-sm text-gray-800 leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors"
                                        title={truyen.ten_truyen} // Di chuột vào sẽ hiện full tên nếu bị cắt ngắn
                                    >
                                        {truyen.ten_truyen}
                                    </h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            Chưa có truyện nào được cập nhật.
                        </div>
                    )}

                </div>
            </div>
        </ClientLayout>
    );
}