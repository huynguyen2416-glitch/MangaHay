import React, { useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

export default function CommentSection({ id_manga, id_chap = null, comments = [] }) {
    const { auth } = usePage().props; 
    
    // State để theo dõi xem đang trả lời ai
    const [replyingTo, setReplyingTo] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        noi_dung: '',
        id_chap: id_chap,
        parent_id: null // Thêm biến parent_id vào form
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('client.comment.store', id_manga), {
            preserveScroll: true,
            onSuccess: () => {
                reset('noi_dung');
                setReplyingTo(null); // Gửi xong thì reset trạng thái trả lời
                setData('parent_id', null);
            },
        });
    };

    // Hàm gọi khi bấm nút "Trả lời" ở một bình luận
    const handleReply = (cmt) => {
        setReplyingTo(cmt);
        setData('parent_id', cmt.id);
        // Cuộn mượt mà lên khu vực form nhập
        document.getElementById('comment-form-section').scrollIntoView({ behavior: 'smooth' });
    };

    // Hàm hủy trả lời
    const cancelReply = () => {
        setReplyingTo(null);
        setData('parent_id', null);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden text-gray-700 border border-gray-200 shadow-sm" id="comment-form-section">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 text-lg flex items-center">
                    <i className="fas fa-comments text-[#ff6740] mr-2"></i> Bình luận ({comments.length})
                </h3>
            </div>
            
            <div className="p-6">
                {/* Khu vực nhập bình luận */}
                {auth.user ? (
                    <form onSubmit={submitComment} className="mb-8 relative bg-gray-50 p-4 rounded-lg border border-gray-100">
                        {/* Hiển thị box thông báo đang trả lời ai */}
                        {replyingTo && (
                            <div className="mb-3 flex justify-between items-center bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded text-sm">
                                <span>Đang trả lời <b>{replyingTo.user?.name}</b></span>
                                <button type="button" onClick={cancelReply} className="text-gray-500 hover:text-red-500 font-bold">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        )}

                        <textarea 
                            value={data.noi_dung}
                            onChange={e => setData('noi_dung', e.target.value)}
                            className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#ff6740] focus:ring-1 focus:ring-[#ff6740] resize-none transition-shadow"
                            rows="3"
                            placeholder={replyingTo ? "Nhập câu trả lời của bạn..." : "Chia sẻ cảm nghĩ của bạn về truyện này..."}
                            required
                        ></textarea>
                        {errors.noi_dung && <p className="text-red-500 text-xs mt-1">{errors.noi_dung}</p>}
                        
                        <div className="flex justify-end mt-3">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-[#ff6740] hover:bg-[#e55a35] text-white px-6 py-2 rounded font-bold transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Đang gửi...' : (replyingTo ? 'Gửi trả lời' : 'Gửi bình luận')}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center mb-8">
                        <p className="text-gray-600 mb-4">Bạn cần đăng nhập để tham gia thảo luận cùng cộng đồng.</p>
                        <Link href={route('login')} className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded transition shadow-sm">
                            Đăng nhập ngay
                        </Link>
                    </div>
                )}

                {/* Danh sách bình luận */}
                <div className="space-y-6">
                    {comments.length > 0 ? (
                        comments.map((cmt) => (
                            <div key={cmt.id} className="group">
                                {/* Bình luận gốc */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                                        {cmt.user ? cmt.user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <h4 className="font-bold text-gray-800 hover:text-[#ff6740] transition cursor-pointer">
                                                {cmt.user ? cmt.user.name : 'Người dùng ẩn danh'}
                                            </h4>
                                            <span className="text-xs text-gray-500 font-medium">{cmt.time_ago}</span>
                                        </div>
                                        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {cmt.noi_dung}
                                        </div>
                                        <div className="flex gap-4 mt-2 text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {/* Nút kích hoạt hàm handleReply */}
                                            <button onClick={() => handleReply(cmt)} className="hover:text-[#ff6740] transition"><i className="fas fa-reply mr-1"></i> Trả lời</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Hiển thị các bình luận con (Replies) thụt lề vào trong */}
                                {cmt.replies && cmt.replies.length > 0 && (
                                    <div className="ml-14 mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                                        {cmt.replies.map(reply => (
                                            <div key={reply.id} className="flex gap-3 group/reply">
                                                <div className="w-8 h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold flex-shrink-0">
                                                    {reply.user ? reply.user.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-baseline gap-2 mb-1">
                                                        <h4 className="font-bold text-gray-700 text-sm">{reply.user ? reply.user.name : 'Người dùng'}</h4>
                                                        <span className="text-[10px] text-gray-400">{reply.time_ago}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 whitespace-pre-wrap">
                                                        {reply.noi_dung}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-8">
                            <i className="far fa-comment-dots text-5xl mb-3 opacity-30 text-gray-300"></i>
                            <p className="text-gray-500">Chưa có bình luận nào. Hãy là người đầu tiên bóc tem!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}