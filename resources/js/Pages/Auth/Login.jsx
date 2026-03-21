import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout'; // <-- Import Layout ở đây

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => reset('password');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <ClientLayout hideSidebar={true}>
            <Head title="Đăng nhập" />
            
            <div className="flex flex-col items-center justify-center py-12">
                <div className="w-full sm:max-w-md p-8 bg-white shadow-xl rounded-xl border-t-4 border-orange-600">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-black text-orange-600">
                            ĐĂNG NHẬP
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">Đăng nhập để theo dõi truyện</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        <div>
                            <label className="block font-semibold text-sm text-gray-700">Email của bạn</label>
                            <input
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                requiorange
                            />
                            <span className="text-orange-600 text-sm">{errors.email}</span>
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold text-sm text-gray-700">Mật khẩu</label>
                            <input
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                onChange={(e) => setData('password', e.target.value)}
                                requiorange
                            />
                            <span className="text-orange-600 text-sm">{errors.password}</span>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Link href="/register" className="text-sm text-gray-600 hover:text-orange-600 hover:underline">
                                Chưa có tài khoản?
                            </Link>

                            <button 
                                className="px-6 py-2 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 transition" 
                                disabled={processing}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ClientLayout>
    );
}