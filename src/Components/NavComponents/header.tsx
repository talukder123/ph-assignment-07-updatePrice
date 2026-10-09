import Image from 'next/image';
import React from 'react';
import logoImg from '@/assets/logo-icon.png'
import Link from 'next/link';

const date = new Date().toLocaleString("bn-BD", {
    dateStyle : "full"
})

const HeaderSectoin = () => {
    return (
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500 shadow-md shrink-0">
                    <Link href={"/"}>
                    <Image
                        src={logoImg}
                        alt="Bazar Dor logo"
                        width={28}
                        height={28}
                        priority
                        className="object-contain"
                    /></Link>
                </div>
                <div className="leading-tight">
                    <h1 className="text-xl font-bold">বাজার দর</h1>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>

            <div className='flex gap-3'>
                <button className="btn btn-soft btn-success">সাইন আপ</button>
                <button className="btn btn-success">সাইন ইন</button>
            </div>
            
        </div>
    );
};

export default HeaderSectoin;