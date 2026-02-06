import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ cartItems }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const updateQuantity = (cartItem, quantity) => {
        router.patch(route('cart.update', cartItem.id), { quantity });
    };

    const removeItem = (cartItem) => {
        router.delete(route('cart.destroy', cartItem.id));
    };

    return (
        <ShopLayout>
            <Head title="カート" />

            <h1 className="text-2xl font-bold text-gray-900">ショッピングカート</h1>

            {cartItems.length === 0 ? (
                <div className="mt-8 text-center">
                    <p className="text-gray-500">カートに商品がありません。</p>
                    <Link
                        href={route('products.index')}
                        className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        商品一覧へ戻る
                    </Link>
                </div>
            ) : (
                <div className="mt-8">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 rounded-lg bg-white p-4 shadow"
                            >
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                    {item.product.image_path ? (
                                        <img
                                            src={`/storage/${item.product.image_path}`}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <Link
                                        href={route('products.show', item.product.id)}
                                        className="font-medium text-gray-900 hover:text-indigo-600"
                                    >
                                        {item.product.name}
                                    </Link>
                                    <p className="text-sm text-gray-500">
                                        {formatPrice(item.product.price)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="flex h-8 w-8 items-center justify-center rounded border text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center text-sm">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item, item.quantity + 1)}
                                        className="flex h-8 w-8 items-center justify-center rounded border text-gray-600 hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="w-24 text-right font-medium text-gray-900">
                                    {formatPrice(item.product.price * item.quantity)}
                                </div>

                                <button
                                    onClick={() => removeItem(item)}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-lg bg-white p-4 shadow">
                        <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                            <span>合計</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            )}
        </ShopLayout>
    );
}
