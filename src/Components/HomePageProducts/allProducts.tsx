import React from 'react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import ProductCard from '../productCard';

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
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

const allProductsData = async (): Promise<IProduct[]> => {
     try {
        const res = await fetch(
            "https://openapi.programming-hero.com/api/bazardor/products",
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid API response");
        }

        return data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

const AllProducts = async () => {

    const allProducts = await allProductsData();

     if (allProducts.length === 0) {
        return (
            <div className="max-w-7xl mx-auto mt-10 px-4 text-center">
                <h2 className="text-xl font-semibold">
                    পণ্যের তথ্য লোড করা যাচ্ছে না!
                </h2>

                <p className="mt-2 text-gray-500">
                    অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
                </p>
            </div>
        );
    }


    const total = allProducts.length;
    const totalBn = total.toLocaleString("bn-BD");

    return (
        <div className='max-w-7xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8'>

            {/* dam bereche */}
            <div className=''>
                <div className='flex gap-2 items-center'>
                    <span className='text-red-500'><FaCaretUp size={30} /></span>
                    <h1 className='text-xl sm:text-2xl lg:text-[28px]'>আজ দাম বেড়েছে</h1>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                    {
                        allProducts.filter((product: IProduct) => product.change.dir === "up").
                            sort((a: IProduct, b: IProduct) => b.change.pct - a.change.pct).
                            slice(0, 6).map((product: IProduct) => <ProductCard key={product.id} product={product}></ProductCard>)
                    }
                </div>
            </div>

            {/* dam komeche */}
            <div className='mt-7 sm:mt-9'>
                <div className='flex gap-2 items-center'>
                    <span className='text-green-500'><FaCaretDown size={30} /></span>
                    <h1 className='text-xl sm:text-2xl lg:text-[28px]'>আজ দাম কমেছে</h1>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                    {
                        allProducts.filter((product: IProduct) => product.change.dir === "down").
                            sort((a: IProduct, b: IProduct) => a.change.pct - b.change.pct).
                            slice(0, 6).map((product: IProduct) => <ProductCard key={product.id} product={product}></ProductCard>)
                    }
                </div>

            </div>

            {/* all */}
            <div id='all' className='mt-7 sm:mt-9'>
                <h1 className='text-xl sm:text-2xl lg:text-[28px]'>সব পণ্য</h1>
                <p className='text-base sm:text-lg lg:text-[20px] text-gray-500'>মোট {totalBn}টি পণ্য দেখানো হচ্ছে</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                     {
                        allProducts.map((product: IProduct) => <ProductCard key={product.id} product={product}></ProductCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default AllProducts;