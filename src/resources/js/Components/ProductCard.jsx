import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    return (
        <Link
            href={route('products.show', product.id)}
            className="group block overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition-shadow"
        >
            <div className="aspect-square overflow-hidden bg-gray-100">
                {product.image_path ? (
                    <img
                        src={`/storage/${product.image_path}`}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <svg
                            className="h-16 w-16"
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
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                </h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                    {formatPrice(product.price)}
                </p>
            </div>
        </Link>
    );
}
