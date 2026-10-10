'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from '@heroui/react';
import { authClient, useSession } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {


    const {
        data: session,
        isPending,
        refetch,
    } = useSession();


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleLogOut = async () => {
        const { error } = await authClient.signOut();
        if (error) {
            console.error(error);
            return;
        }
        window.location.assign('/sign-in');
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = String(new FormData(e.currentTarget).get('name')).trim();

        const { error } = await authClient.updateUser({ name });

        if (error) {
            toast.error(error.message ?? 'নাম আপডেট করা যায়নি');
            return;
        }

        toast.success('নাম সফলভাবে আপডেট হয়েছে');
        await refetch();

        
    };

    if (isPending) {
        return <p className="mx-auto max-w-3xl px-4 py-10 text-gray-500">লোড হচ্ছে...</p>;
    }

    if (!session?.user) return null;

    const user = session.user;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto w-full max-w-3xl">

                {/* হেডিং */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* ইউজার কার্ড */}
                <div className="mb-6 flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={64}
                                height={64}
                                referrerPolicy="no-referrer"
                                className="h-16 w-16 rounded-2xl bg-gray-100 object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-2xl font-semibold text-white">
                                {user.name?.charAt(0)}
                            </div>
                        )}
                        <div>
                            <p className="text-xl font-medium text-gray-900">{user.name}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogOut}
                        className="cursor-pointer rounded-xl border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        ↩ সাইন আউট
                    </button>
                </div>

                {/* তথ্য কার্ড */}
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-900">তথ্য</h2>

                    <Form className="w-full" onSubmit={onSubmit}>
                        <div className="flex w-full flex-col gap-4">
                            <TextField
                                isRequired
                                name="name"
                                defaultValue={user.name}
                                validate={(value) => {
                                    if (value.trim().length < 3) {
                                        return 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে';
                                    }
                                    return null;
                                }}
                            >
                                <Label className="mb-1.5 block text-sm font-medium text-gray-800">নাম</Label>
                                <Input
                                    className="w-full rounded-xl! border! border-gray-200! bg-white! px-4! py-3! text-sm! shadow-none! focus:border-green-600! focus:ring-2 focus:ring-green-600/20"
                                    placeholder="আপনার নাম"
                                />
                                <FieldError className="mt-1 text-xs text-red-600" />
                            </TextField>

                            {message && (
                                <p className={`text-sm ${message.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                                    {message.text}
                                </p>
                            )}

                            <Button
                                type="submit"
                                isDisabled={loading}
                                className="w-full cursor-pointer rounded-xl! bg-green-700! py-3! text-sm! font-semibold! text-white! shadow-md transition hover:bg-green-800! disabled:opacity-60"
                            >
                                {loading ? 'অপেক্ষা করুন...' : 'আপডেট'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;