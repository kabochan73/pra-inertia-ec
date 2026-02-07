import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Cancel() {
    return (
        <ShopLayout>
            <Head title="決済キャンセル" />

            <div className="mx-auto max-w-2xl text-center">
                <div className="rounded-lg bg-white p-8 shadow">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                        <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>

                    <h1 className="mt-4 text-2xl font-bold text-gray-900">決済がキャンセルされました</h1>
                    <p className="mt-2 text-gray-500">
                        決済は完了していません。カートの商品はそのまま残っています。
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href={route('cart.index')}
                            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            カートに戻る
                        </Link>
                        <Link
                            href={route('products.index')}
                            className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            買い物を続ける
                        </Link>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
