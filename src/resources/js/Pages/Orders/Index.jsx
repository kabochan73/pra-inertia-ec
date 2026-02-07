import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ orders }) {
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
            <Head title="注文履歴" />

            <h1 className="text-2xl font-bold text-gray-900">注文履歴</h1>

            {orders.data.length === 0 ? (
                <div className="mt-8 text-center">
                    <p className="text-gray-500">注文履歴がありません。</p>
                    <Link
                        href={route('products.index')}
                        className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        商品一覧へ
                    </Link>
                </div>
            ) : (
                <div className="mt-8 space-y-4">
                    {orders.data.map((order) => (
                        <Link
                            key={order.id}
                            href={route('orders.show', order.id)}
                            className="block rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        注文 #{order.id}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {formatDate(order.created_at)}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {order.order_items.length}点の商品
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                        {formatPrice(order.total_amount)}
                                    </p>
                                    <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                        支払済み
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {orders.links && orders.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {orders.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`rounded px-3 py-2 text-sm ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : link.url
                                              ? 'bg-white text-gray-700 hover:bg-gray-50'
                                              : 'bg-gray-100 text-gray-400 cursor-default'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </ShopLayout>
    );
}
