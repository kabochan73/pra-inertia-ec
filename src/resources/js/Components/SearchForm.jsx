import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function SearchForm({ search: initialSearch, action = '/' }) {
    const [search, setSearch] = useState(initialSearch || '');

    function handleSearch(e) {
        e.preventDefault();
        router.get(action, search ? { search } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleClear() {
        setSearch('');
        router.get(action, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="商品名やキーワードで検索..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
                検索
            </button>
            {initialSearch && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    クリア
                </button>
            )}
        </form>
    );
}
