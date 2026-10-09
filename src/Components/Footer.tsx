import React from 'react';

const FooterSection = () => {
    return (
        <div className="border-t border-gray-200 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
                <h1 className="text-sm md:text-base font-medium text-gray-700 text-center md:text-left">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </h1>

                <h1 className="text-sm md:text-base font-medium text-gray-700 text-center md:text-right leading-relaxed">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </h1>
            </div>
        </div>

    );
};

export default FooterSection;