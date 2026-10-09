import Link from 'next/link';
import React from 'react';

const getCategroy = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
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
        <div className='max-w-6xl mx-auto flex gap-5 justify-items-start py-3'>
            {
                data.map((n:Category) => <Link className='font-semibold' href={`/categories/${n.slug}`} key={n.id}>{n.icon} {n.nameBn}</Link>)
            }
        </div>
    );
};

export default Navlinks;