'use client';

import React, { useRef } from 'react';

const MobileMenu = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDetailsElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // link-e click korle dropdown close hobe
        if ((e.target as HTMLElement).closest('a') && ref.current) {
            ref.current.open = false;
        }
    };

    return (
        <details ref={ref} className='md:hidden relative group py-2'>
            <summary className='list-none [&::-webkit-details-marker]:hidden cursor-pointer font-semibold flex items-center gap-2 py-1'>
                <span className='text-2xl group-open:hidden'>☰</span>
                <span className='text-2xl hidden group-open:inline'>✕</span>
                ক্যাটাগরি
            </summary>
            <div
                onClick={handleClick}
                className='absolute left-0 right-0 top-full z-40 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-2 gap-1'
            >
                {children}
            </div>
        </details>
    );
};

export default MobileMenu;