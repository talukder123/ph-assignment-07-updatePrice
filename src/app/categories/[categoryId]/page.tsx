import SortableProducts from '@/Components/SortableProducts';
import IProduct from '@/types/type';
import React from 'react';

type IProps = {
  params: Promise<{ categoryId: string }>;
};

const CategoryHeadingData = async (categoryId: string) => {
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/categories/${categoryId}`);
  return res.json();
};

const CategoryWiseFilteredData = async (categoryId: string): Promise<IProduct[]> => {
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`);
  return res.json();
};

const CategoryWiseItem = async ({ params }: IProps) => {
  const { categoryId } = await params;

  const headingData = await CategoryHeadingData(categoryId);
  const FilteredData = await CategoryWiseFilteredData(categoryId);

  const total = FilteredData.length.toLocaleString('bn-BD');

  return (
    <div>
      <div className="bg-white flex items-center max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5">
        <span className="text-5xl">{headingData.icon}</span>
        <div>
          <h1 className="text-3xl font-semibold">{headingData.nameBn}</h1>
          <h1>{total}টি পণ্যের আজকের দাম ও পরিবর্তন</h1>
        </div>
      </div>

      <SortableProducts products={FilteredData} />
    </div>
  );
};

export default CategoryWiseItem;