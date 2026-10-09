'use client';
import React, { useState } from 'react';

import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { signUp } from '@/lib/auth-client';


const SignUpPage = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        if (data.password !== data.confirmPassword) {
            setErrors({ confirmPassword: 'দুটি পাসওয়ার্ড মিলছে না' });
            return;
        }
        setErrors({});

        const { data: signUpData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        });

         console.log(data, error);
    };


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto w-full max-w-md">

                {/* হেডিং: কার্ডের বাইরে */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                {/* সাদা কার্ড */}
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <Form className="w-full" validationErrors={errors} onSubmit={onSubmit}>
                        <Fieldset className="w-full">
                            <Fieldset.Legend className="sr-only">অ্যাকাউন্ট তৈরি করুন</Fieldset.Legend>

                            <Description className="sr-only">
                                বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                            </Description>

                            <FieldGroup className="flex flex-col gap-4">
                                <TextField
                                    isRequired
                                    name="name"
                                    validate={(value) => {
                                        if (value.length < 3) {
                                            return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label className="mb-1.5 block text-sm font-medium text-gray-800">নাম</Label>
                                    <Input
                                        className="w-full rounded-xl! border! border-gray-200! bg-white! px-4! py-3! text-sm! shadow-none! focus:border-green-600! focus:ring-2 focus:ring-green-600/20"
                                        placeholder="যেমন: রহিম উদ্দিন"
                                    />
                                    <FieldError className="mt-1 text-xs text-red-600" />
                                </TextField>

                                <TextField isRequired name="email" type="email">
                                    <Label className="mb-1.5 block text-sm font-medium text-gray-800">ইমেইল</Label>
                                    <Input
                                        className="w-full rounded-xl! border! border-gray-200! bg-white! px-4! py-3! text-sm! shadow-none! focus:border-green-600! focus:ring-2 focus:ring-green-600/20"
                                        placeholder="you@example.com"
                                    />
                                    <FieldError className="mt-1 text-xs text-red-600" />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="password"
                                    type="password"
                                    validate={(value) => {
                                        if (value.length < 8) {
                                            return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                                        }
                                        if (!/[A-Z]/.test(value)) {
                                            return "কমপক্ষে একটি বড় হাতের (A-Z) অক্ষর থাকতে হবে";
                                        }
                                        if (!/[0-9]/.test(value)) {
                                            return "কমপক্ষে একটি সংখ্যা থাকতে হবে";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label className="mb-1.5 block text-sm font-medium text-gray-800">পাসওয়ার্ড</Label>
                                    <Input
                                        className="w-full rounded-xl! border! border-gray-200! bg-white! px-4! py-3! text-sm! shadow-none! focus:border-green-600! focus:ring-2 focus:ring-green-600/20"
                                        placeholder="কমপক্ষে ৮ অক্ষর"
                                    />
                                    <Description className="mt-1 text-xs text-gray-500">
                                        কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে
                                    </Description>
                                    <FieldError className="mt-1 text-xs text-red-600" />
                                </TextField>

                                <TextField isRequired name="confirmPassword" type="password">
                                    <Label className="mb-1.5 block text-sm font-medium text-gray-800">পাসওয়ার্ড নিশ্চিত করুন</Label>
                                    <Input
                                        className="w-full rounded-xl! border! border-gray-200! bg-white! px-4! py-3! text-sm! shadow-none! focus:border-green-600! focus:ring-2 focus:ring-green-600/20"
                                        placeholder="আবার লিখুন"
                                    />
                                    <FieldError className="mt-1 text-xs text-red-600" />
                                </TextField>


                            </FieldGroup>

                            <Fieldset.Actions className="mt-5">
                                <Button
                                    type="submit"
                                    className="w-full rounded-xl! bg-green-700! py-3! text-sm! font-semibold! text-white! shadow-md hover:bg-green-800!"
                                >
                                    অ্যাকাউন্ট তৈরি করুন
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </div>

            </div>
        </div>
    );
};

export default SignUpPage;