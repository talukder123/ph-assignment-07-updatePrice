"use client"

import Image from 'next/image';
import React from 'react';
import logoImg from '@/assets/logo-icon.png'
import Link from 'next/link';
import { authClient, useSession } from '@/lib/auth-client';

const date = new Date().toLocaleString("bn-BD", {
    dateStyle: "full"
})

const HeaderSectoin = () => {

    const { data: session } = useSession();

    const handleLogOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
        console.error(error);
        return;
    }
    window.location.assign("/sign-in");
};


    console.log(session);


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
                {
                    session?.user ? (
                        <div className="dropdown dropdown-end">
                            {/* ট্রিগার: ছবি + নাম + তীর */}
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex cursor-pointer items-center gap-2 transition hover:opacity-80"
                            >
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name}
                                        width={36}
                                        height={36}
                                        referrerPolicy="no-referrer"
                                        className="h-9 w-9 rounded-xl bg-gray-100 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-semibold text-white">
                                        {session.user.name?.charAt(0)}
                                    </div>
                                )}

                                <span className="max-w-28 truncate text-base font-medium text-gray-900">
                                    {session.user.name}
                                </span>

                                <svg
                                    className="h-2.5 w-2.5 text-gray-500"
                                    viewBox="0 0 10 10"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M1 2.5h8L5 8z" />
                                </svg>
                            </div>

                            {/* ড্রপডাউন মেনু */}
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu z-10 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
                            >
                                <li>
                                    <Link href="/profile" className="cursor-pointer">প্রোফাইল</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="cursor-pointer text-red-600">
                                        সাইন আউট
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link href={"/sign-in"}><button className="btn btn-ghost">সাইন ইন</button></Link>
                            <Link href={"/sign-up"}><button className="btn btn-success shadow-lg">সাইন আপ</button></Link>
                            
                        </>
                    )
                }
            </div>

        </div>
    );
};

export default HeaderSectoin;