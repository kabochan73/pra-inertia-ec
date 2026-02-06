import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ products, flash }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    const handleDelete = (product) => {
        if (confirm(`「${product.name}」を削除してもよろしいですか？`)) {
            router.delete(route('admin.products.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        商品管理
                    </h2>
                    <Link
                        href={route('admin.products.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        新規作成
                    </Link>
                </div>
            }
        >
            <Head title="商品管理" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.message && (
                        <div className="mb-4 rounded-md bg-green-50 p-4">
                            <p className="text-sm text-green-700">{flash.message}</p>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {products.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                商品
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                価格
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                状態
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                操作
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                                            {product.image_path ? (
                                                                <img
                                                                    src={`/storage/${product.image_path}`}
                                                                    alt={product.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                                    <svg
                                                                        className="h-5 w-5"
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
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                    {formatPrice(product.price)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            product.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {product.is_active ? '公開中' : '非公開'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <Link
                                                        href={route('admin.products.edit', product.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        編集
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product)}
                                                        className="ml-4 text-red-600 hover:text-red-900"
                                                    >
                                                        削除
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">商品がまだありません</p>
                                    <Link
                                        href={route('admin.products.create')}
                                        className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
                                    >
                                        最初の商品を作成する
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
