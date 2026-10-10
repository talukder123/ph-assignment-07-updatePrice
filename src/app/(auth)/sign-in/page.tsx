"use client";

import React from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';


const SignInPage = () => {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signInData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log(signInData, error);

  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md">

        {/* হেডিং: কার্ডের বাইরে */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">সাইন ইন করুন</h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে ঢুকে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* সাদা কার্ড */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "সঠিক ইমেইল ঠিকানা দিন";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 block text-sm font-medium text-gray-800">ইমেইল</Label>
              <Input
                className="w-full rounded-xl! border! border-gray-200! bg-white! px-4! py-3! text-sm! shadow-none! focus:border-green-600! focus:ring-2 focus:ring-green-600/20"
                placeholder="you@example.com"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField
              isRequired
              minLength={8}
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
                placeholder="আপনার পাসওয়ার্ড লিখুন"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              className="mt-1 w-full rounded-xl! bg-green-700! py-3! text-sm! font-semibold! text-white! shadow-md hover:bg-green-800!"
            >
              সাইন ইন করুন
            </Button>
          </Form>

          {/* অথবা */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* সোশ্যাল বাটন */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              className="rounded-xl! border! border-gray-200! bg-white! py-2.5! text-sm! font-medium! text-gray-800! hover:bg-gray-50!"
            >
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button
              type="button"
              className="rounded-xl! border! border-gray-200! bg-white! py-2.5! text-sm! font-medium! text-gray-800! hover:bg-gray-50!"
            >
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{' '}
            <a href="/signup" className="font-medium text-green-700 hover:underline">
              সাইন আপ করুন
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-800">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;