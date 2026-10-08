import React from 'react';

import HeaderSectoin from "@/Components/NavComponents/header";
import Navlinks from "@/Components/NavComponents/navlinks";
import MarqueeSection from "@/Components/NavComponents/Marquee";

const Navbar = () => {
    return (
        <div>
            <HeaderSectoin></HeaderSectoin>
        <Navlinks></Navlinks>
        <MarqueeSection></MarqueeSection>
        </div>
    );
};

export default Navbar;