import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Success({ order }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    return (
        <ShopLayout>
            <Head title="注文完了" />

            <div className="mx-auto max-w-2xl text-center">
                <div className="rounded-lg bg-white p-8 shadow">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="mt-4 text-2xl font-bold text-gray-900">ご注文ありがとうございます</h1>
                    <p className="mt-2 text-gray-500">
                        注文番号: #{order.id}
                    </p>

                    <div className="mt-6 border-t pt-6">
                        <h2 className="text-lg font-semibold text-gray-900">注文内容</h2>
                        <div className="mt-4 space-y-2">
                            {order.order_items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        {item.product_name} x {item.quantity}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {formatPrice(item.product_price * item.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                            <span>合計</span>
                            <span>{formatPrice(order.total_amount)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href={route('orders.index')}
                            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            注文履歴を見る
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
