import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ product }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    return (
        <ShopLayout>
            <Head title={product.name} />

            <div className="mb-6">
                <Link
                    href={route('products.index')}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    &larr; 商品一覧に戻る
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="lg:flex">
                    <div className="lg:w-1/2">
                        <div className="aspect-square bg-gray-100">
                            {product.image_path ? (
                                <img
                                    src={`/storage/${product.image_path}`}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                    <svg
                                        className="h-24 w-24"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 lg:w-1/2 lg:p-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-3xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                        </p>

                        {product.description && (
                            <div className="mt-6">
                                <h2 className="text-sm font-medium text-gray-900">
                                    商品説明
                                </h2>
                                <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
