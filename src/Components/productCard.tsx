import React from 'react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

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

const toBn = (n: number) => n.toLocaleString("bn-BD");

const ProductCard = ({ product }: { product: IProduct }) => {
    const isUp = product.change.dir === "up";

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            {/* top: icon + name */}
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {product.categoryIcon}
                </div>
                <div className="leading-tight">
                    <h3 className="text-xl font-semibold text-gray-900">{product.nameBn}</h3>
                    <p className="text-sm text-gray-600">প্রতি {product.unit}</p>
                </div>
            </div>

            {/* bottom: price + badge */}
            <div className="mt-5 flex items-end justify-between">
                <div>
                    <p className="text-sm text-gray-600">আজকের দাম</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {toBn(product.today)}{" "}
                        <span className="text-base font-normal">টাকা</span>
                    </p>
                </div>

                <span
                    className={`flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium ${
                        isUp ? "text-red-600" : "text-green-600"
                    }`}
                >
                    {isUp ? <FaCaretUp size={16} /> : <FaCaretDown size={16} />}
                    {toBn(product.change.pct)}%
                </span>
            </div>
        </div>
    );
};

export default ProductCard;