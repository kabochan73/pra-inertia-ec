import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product.name,
        description: product.description || '',
        price: product.price,
        image: null,
        is_active: product.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    商品編集
                </h2>
            }
        >
            <Head title="商品編集" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="商品名" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="説明" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="価格（円）" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                        min="0"
                                    />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="商品画像" />
                                    {product.image_path && (
                                        <div className="mt-2 mb-4">
                                            <p className="text-sm text-gray-500 mb-2">現在の画像:</p>
                                            <img
                                                src={`/storage/${product.image_path}`}
                                                alt={product.name}
                                                className="h-32 w-32 object-cover rounded"
                                            />
                                        </div>
                                    )}
                                    <input
                                        id="image"
                                        type="file"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        新しい画像を選択すると、現在の画像が置き換わります
                                    </p>
                                    <InputError className="mt-2" message={errors.image} />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <InputLabel htmlFor="is_active" value="公開する" className="ml-2" />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('admin.products.index')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        キャンセル
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        更新
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
