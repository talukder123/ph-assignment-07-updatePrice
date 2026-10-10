
import SortableProducts from '@/Components/SortableProducts';
import IProduct from '@/types/type';
import React from 'react';

type IProps = {
  params: Promise<{ categoryId: string }>;
};

type ICategory = {
  icon: string;
  nameBn: string;
};

const CategoryHeadingData = async (
  categoryId: string
): Promise<ICategory | null> => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${categoryId}`,
      { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Failed to fetch category');

    return await res.json();
  } catch (error) {
    console.error('Category heading fetch failed:', error);
    return null;
  }
};

const CategoryWiseFilteredData = async (
  categoryId: string
): Promise<IProduct[]> => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
      { cache: 'no-store' }
    );

    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid products response');
    }

    return data;
  } catch (error) {
    console.error('Category products fetch failed:', error);
    return [];
  }
};

const CategoryWiseItem = async ({ params }: IProps) => {
  const { categoryId } = await params;

  const [headingData, filteredData] = await Promise.all([
    CategoryHeadingData(categoryId),
    CategoryWiseFilteredData(categoryId),
  ]);

  const total = filteredData.length.toLocaleString('bn-BD');

  return (
    <div>
      <div className="bg-white flex items-center max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5 gap-4">
        <span className="text-5xl">
          {headingData?.icon ?? '🛒'}
        </span>

        <div>
          <h1 className="text-3xl font-semibold">
            {headingData?.nameBn ?? 'পণ্যের ক্যাটাগরি'}
          </h1>

          <p>
            {total}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <SortableProducts products={filteredData} />
      ) : (
        <div className="max-w-7xl mx-auto mt-10 px-4 text-center">
          <h2 className="text-xl font-semibold">
            পণ্যের তথ্য লোড করা যাচ্ছে না!
          </h2>
          <p className="mt-2 text-gray-500">
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryWiseItem;
