'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/Components/productCard';
import IProduct from '@/types/type';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function SortableProducts({ products }: { products: IProduct[] }) {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    if (sortBy === 'price-asc') return arr.sort((a, b) => a.today - b.today);
    if (sortBy === 'price-desc') return arr.sort((a, b) => b.today - a.today);
    return arr;
  }, [products, sortBy]);

  return (
    <>
      <div className="bg-white max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5 flex items-center justify-between">
        <p>SEARCH_BAR</p>

        <label className="flex items-center gap-2">
          সাজান:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-200 rounded px-2 py-1"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}