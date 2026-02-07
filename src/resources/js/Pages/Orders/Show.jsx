import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ order }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <ShopLayout>
            <Head title={`注文 #${order.id}`} />

            <div className="mb-4">
                <Link
                    href={route('orders.index')}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    &larr; 注文履歴に戻る
                </Link>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">注文 #{order.id}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {formatDate(order.created_at)}
                        </p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        支払済み
                    </span>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900">注文商品</h2>
                    <div className="mt-4 space-y-4">
                        {order.order_items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b pb-4 last:border-0"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">{item.product_name}</p>
                                    <p className="text-sm text-gray-500">
                                        {formatPrice(item.product_price)} x {item.quantity}
                                    </p>
                                </div>
                                <p className="font-medium text-gray-900">
                                    {formatPrice(item.product_price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold text-gray-900">
                    <span>合計</span>
                    <span>{formatPrice(order.total_amount)}</span>
                </div>
            </div>
        </ShopLayout>
    );
}
