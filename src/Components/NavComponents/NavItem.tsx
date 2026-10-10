'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
    slug: string;
    children: React.ReactNode;
    variant?: 'mobile' | 'desktop';
};

const NavItem = ({ slug, children, variant = 'desktop' }: Props) => {
    const pathname = usePathname();
    const href = `/categories/${slug}`;
    const isActive = pathname === href;

    const base = variant === 'mobile'
        ? 'font-semibold px-3 py-3 rounded-lg'
        : 'font-semibold px-3 py-2 rounded-lg';

    const state = isActive
        ? 'bg-green-50 text-green-600'
        : 'hover:bg-gray-100';

    return (
        <Link
            href={href}
            className={`${base} ${state}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
};

export default NavItem;