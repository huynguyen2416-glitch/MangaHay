import React from 'react';
import Sidebar from '@/Components/Admin/Sidebar';
import Header from '@/Components/Admin/Header';
import Footer from '@/Components/Admin/Footer';

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            
            <Sidebar />

            
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                
                <Header />

              
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>

                <Footer />
                
            </div>
            
        </div>
    );
}