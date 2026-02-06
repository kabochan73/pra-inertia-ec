import ProductCard from '@/Components/ProductCard';
import SearchForm from '@/Components/SearchForm';
import ShopLayout from '@/Layouts/ShopLayout';
import { Head } from '@inertiajs/react';

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

            {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
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
        </ShopLayout>
    );
}
