import Image from 'next/image';
import React from 'react';
import bannerImg from '@/assets/bazar-hero.png'

const bannerSection = () => {
    const date = new Date().toLocaleString("bn-BD", {
        dateStyle: "full"
    })

    return (
        <div className="mt-7 max-w-7xl mx-auto border border-gray-200 rounded-2xl py-6 px-6 md:px-10 flex flex-col-reverse md:flex-row justify-between items-center gap-6">


            <div className="space-y-4">
                <p className="bg-green-200 text-green-700 px-3 py-1 rounded-full w-fit font-semibold text-sm">
                    {date}
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                    আজকের বাজারের দাম এক নজরে
                </h1>
                <p className="text-gray-500 max-w-xl">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
                    গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>
                <button className="btn btn-success text-white">সব পণ্য দেখুন</button>
            </div>

            

            <Image
                src={bannerImg}
                alt="Bazar Dor banner"
                width={280}
                height={300}
                priority
                className="w-48 md:w-72 h-auto shrink-0"
            />
        </div>
    );
};

export default bannerSection;