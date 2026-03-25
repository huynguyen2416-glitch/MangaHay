import React from 'react';
import Header from '@/Components/Client/Header';
import Sidebar from '@/Components/Client/Sidebar';
import Footer from '@/Components/Client/Footer';
import Chatbox from '@/Components/Chatbox';
export default function ClientLayout({ children, hideSidebar = false }) {
    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
            
            <Header />

            <div className="flex-grow max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-6 p-6">
                
                <main className={`w-full ${hideSidebar ? '' : 'md:w-3/4'}`}>
                    {children}
                </main>


                {!hideSidebar && (
                    <div className="w-full md:w-1/4">
                        <Sidebar />
                    </div>
                )}
            </div>
                <Chatbox />
            <Footer />
            
        </div>
    );
}