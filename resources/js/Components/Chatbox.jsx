import React, { useState } from 'react';
import axios from 'axios';

export default function Chatbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'ai', text: 'Chào bạn! Mình có thể giúp gì cho bạn hôm nay?' }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            // Gửi tin nhắn lên Backend Laravel (KHÔNG lộ API Key)
            const response = await axios.post(route('api.chat'), { message: userMsg });
            
            setMessages(prev => [...prev, { sender: 'ai', text: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: 'Lỗi kết nối đến máy chủ AI!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Cửa sổ Chat */}
            {isOpen && (
                <div className="bg-white w-80 rounded-2xl shadow-2xl border border-gray-200 flex flex-col mb-4 overflow-hidden h-96 transition-all">
                    {/* Header */}
                    <div className="bg-orange-500 text-white px-4 py-3 flex justify-between items-center font-bold">
                        <span><i className="fas fa-robot mr-2"></i> MangaHay AI Chatbox</span>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Khung chat */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 text-sm">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-2xl max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-500 rounded-bl-none shadow-sm flex gap-1">
                                    <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ô nhập tin nhắn */}
                    <form onSubmit={sendMessage} className="border-t p-3 bg-white flex items-center gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Hỏi mình gì đó đi..." 
                            className="flex-1 border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-orange-600 disabled:opacity-50">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            )}

            {/* Nút bấm tròn nổi */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
            >
                <i className={isOpen ? "fas fa-times" : "fas fa-comments"}></i>
            </button>
        </div>
    );
}