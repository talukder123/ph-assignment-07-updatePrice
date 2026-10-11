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
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 md:px-6 lg:px-8">

       
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                <Link
                    href="/"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 shadow-md sm:h-12 sm:w-12"
                >
                    <Image
                        src={logoImg}
                        alt="Bazar Dor logo"
                        width={28}
                        height={28}
                        priority
                        className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                    />
                </Link>

                <div className="min-w-0 leading-tight">
                    <h1 className="truncate text-base font-bold sm:text-xl">
                        বাজার দর
                    </h1>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {date}
                    </p>
                </div>

            </div>


            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

                {session?.user ? (
                    <div className="dropdown dropdown-end">


                        <div
                            tabIndex={0}
                            role="button"
                            className="flex max-w-47.5 cursor-pointer items-center gap-1.5 transition hover:opacity-80 sm:max-w-none sm:gap-2"
                        >
                            {session.user.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    width={36}
                                    height={36}
                                    referrerPolicy="no-referrer"
                                    className="h-8 w-8 shrink-0 rounded-xl bg-gray-100 object-cover sm:h-9 sm:w-9"
                                />
                            ) : (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-600 text-sm font-semibold text-white sm:h-9 sm:w-9">
                                    {session.user.name?.charAt(0) || "U"}
                                </div>
                            )}

                            <span className="max-w-18.75 truncate text-sm font-medium text-gray-900 sm:max-w-28 sm:text-base">
                                {session.user.name}
                            </span>

                            <svg
                                className="h-2.5 w-2.5 shrink-0 text-gray-500"
                                viewBox="0 0 10 10"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M1 2.5h8L5 8z" />
                            </svg>
                        </div>

                        {/* Dropdown Menu */}
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu z-50 mt-2 w-44 rounded-xl border border-gray-100 bg-white p-2 shadow-lg sm:w-48"
                        >
                            <li>
                                <Link href="/profile">
                                    প্রোফাইল
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="text-red-600"
                                >
                                    সাইন আউট
                                </button>
                            </li>
                        </ul>

                    </div>
                ) : (
                    <>
                        <Link
                            href="/sign-in"
                            className="btn btn-ghost btn-sm px-2 text-xs sm:btn-md sm:px-4 sm:text-sm"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="btn btn-success btn-sm px-2.5 text-xs shadow-md sm:btn-md sm:px-4 sm:text-sm sm:shadow-lg"
                        >
                            সাইন আপ
                        </Link>
                    </>
                )}

            </div>

        </div>
    );
};

export default HeaderSectoin;