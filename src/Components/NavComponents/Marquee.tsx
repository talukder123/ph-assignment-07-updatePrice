import React from 'react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Product {
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

const getMarqueeData = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data = res.json();
    return data;
}

const MarqueeSection = async () => {

    const MarqueeData = await getMarqueeData();
    return (
        <div className=''>

            <div className="border-y border-gray-100 py-2 flex gap-5 ">
                <MarqueeText direction='right' duration={12}>
                {MarqueeData.map((info: Product) => (
                    <p key={info.id} className="flex items-center gap-1 whitespace-nowrap mr-10">
                        {info.categoryIcon}
                        {info.nameBn} {info.today} টাকা/কেজি

                        <span
                            className={
                                info.change.dir === "up"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }
                        >
                            {info.change.dir === "up" ? <FaCaretUp size={30} /> : <FaCaretDown size={30} />}
                        </span>

                        {info.change.pct}%   
                    </p>
                ))}
                </MarqueeText>
            </div>

        </div>
    );
};

export default MarqueeSection;