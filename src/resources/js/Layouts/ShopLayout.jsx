import { Link, usePage } from '@inertiajs/react';

export default function ShopLayout({ children }) {
    const { auth } = usePage().props;

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
