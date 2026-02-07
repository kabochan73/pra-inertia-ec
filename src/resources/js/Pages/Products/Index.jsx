import ProductCard from '@/Components/ProductCard';
import SearchForm from '@/Components/SearchForm';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products, search }) {
    return (
        <ShopLayout>
            <Head title="商品一覧" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">商品一覧</h1>
                <p className="mt-2 text-gray-600">
                    素敵な雑貨をお探しください
                </p>
            </div>

            <SearchForm search={search} />

            {products.data.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">
                        {search
                            ? `「${search}」に一致する商品が見つかりませんでした`
                            : '商品がまだありません'}
                    </p>
                </div>
            )}

            {products.last_page > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    {products.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`rounded px-3 py-2 text-sm ${
                                link.active
                                    ? 'bg-indigo-600 text-white'
                                    : link.url
                                      ? 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                      : 'bg-gray-100 text-gray-400 cursor-default'
                            }`}
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </ShopLayout>
    );
}
