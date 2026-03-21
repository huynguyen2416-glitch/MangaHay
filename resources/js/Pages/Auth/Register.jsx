import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout'; // <-- Import Layout ở đây

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <ClientLayout hideSidebar={true}>
            <Head title="Đăng ký tài khoản" />
            
            <div className="flex flex-col items-center justify-center py-10">
                <div className="w-full sm:max-w-md p-8 bg-white shadow-xl rounded-xl border-t-4 border-orange-600">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-black text-orange-600">
                            ĐĂNG KÝ
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">Tạo tài khoản mới miễn phí</p>
                    </div>

                    <form onSubmit={submit}>
                        <div>
                            <label className="block font-semibold text-sm text-gray-700">Tên hiển thị</label>
                            <input
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <span className="text-red-600 text-sm">{errors.name}</span>
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold text-sm text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                required
                            />
                            <span className="text-red-600 text-sm">{errors.email}</span>
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold text-sm text-gray-700">Mật khẩu</label>
                            <input
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <span className="text-red-600 text-sm">{errors.password}</span>
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold text-sm text-gray-700">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <span className="text-red-600 text-sm">{errors.password_confirmation}</span>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Link href="/login" className="text-sm text-gray-600 hover:text-orange-600 hover:underline">
                                Đã có tài khoản?
                            </Link>

                            <button 
                                className="px-6 py-2 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition" 
                                disabled={processing}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClientLayout>
    );
}