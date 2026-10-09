import ProductCard from '@/Components/productCard';
import React from 'react';


type IProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}


const CategoryHeadingData = async (categoryId:string) => {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/categories/${categoryId}`);
    const data = await res.json();
    return data;
}

const CategoryWiseFilteredData = async (categoryId:string) => {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`)
    const data = await res.json();
    return data;
}

const CategoryWiseItem = async ({ params }:IProps) => {

    const { categoryId } = await params;

    const headingData = await CategoryHeadingData(categoryId);
    const FilteredData = await CategoryWiseFilteredData(categoryId);

    console.log(FilteredData);




    return (
        <div>
            <div className=' bg-white flex items-center max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5'>
                <span className='text-5xl'>{headingData.icon}</span>
                <div>
                    <h1 className='text-3xl font-semibold'>{headingData.nameBn}</h1>
                    <h1>xটি পণ্যের আজকের দাম ও পরিবর্তন</h1>
                </div>

            </div>

            <div className='bg-white max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5'>
                <p>SEARCH_BAR</p>
            </div>

            <div className='grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5'>
                {
                    FilteredData.map((product:IProduct) => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default CategoryWiseItem;