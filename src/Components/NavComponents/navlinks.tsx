import React from 'react';
import NavItem from './NavItem';
import MobileMenu from './mobileMenu';

const getCategroy = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return data;
}

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};


const Navlinks = async () => {

    const data = await getCategroy();
    console.log(data);

    return (
        <div className='max-w-6xl mx-auto px-4'>

            {/* Phone: dropdown */}
            <MobileMenu>
                {
                    data.map((n: Category) => (
                        <NavItem key={n.id} slug={n.slug} variant='mobile'>
                            {n.icon} {n.nameBn}
                        </NavItem>
                    ))
                }
            </MobileMenu>

            {/* Tablet/Desktop: normal row */}
            <div className='hidden md:flex flex-wrap gap-2 justify-items-start py-3'>
                {
                    data.map((n: Category) => (
                        <NavItem key={n.id} slug={n.slug}>
                            {n.icon} {n.nameBn}
                        </NavItem>
                    ))
                }
            </div>
        </div>
    );
};

export default Navlinks;