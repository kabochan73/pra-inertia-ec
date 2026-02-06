import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ShopLayout({ children }) {
    const { auth, cartItemCount, flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.message) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [flash?.timestamp]);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                雑貨ショップ
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href={route('cart.index')}
                                        className="relative text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                        </svg>
                                        {cartItemCount > 0 && (
                                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>
                                    <Link
                                        href={route('admin.products.index')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        管理画面
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        ログアウト
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        ログイン
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        登録
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {showFlash && (
                <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white shadow-lg">
                    {flash?.message}
                </div>
            )}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            <footer className="bg-white border-t mt-auto">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; 2024 雑貨ショップ. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
