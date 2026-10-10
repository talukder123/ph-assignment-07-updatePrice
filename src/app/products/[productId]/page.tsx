import Link from "next/link";

interface ProductDetailPageProps {
    params: Promise<{ productId: string }>;
}

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
    markets: Market[];
}

const UNIT_BN: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const toBn = (value: number | string) =>
    String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const fmt = (n: number) => toBn(Number.isInteger(n) ? n : n.toFixed(2).replace(/\.?0+$/, ""));

const getDetailData = async (productId: string): Promise<Product | null> => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? json;
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
    const { productId } = await params;
    const product = await getDetailData(productId);

    if (!product) {
        return <div className="p-4">পণ্য পাওয়া যায়নি</div>;
    }

    const unit = UNIT_BN[product.unit] ?? product.unit;

    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";
    const diff = Math.abs(product.today - product.yesterday);

    const rows = product.markets.map((m) => ({
        ...m,
        avg: (m.min + m.max) / 2,
    }));

    const minRow = rows.reduce((a, b) => (b.min < a.min ? b : a));
    const maxRow = rows.reduce((a, b) => (b.max > a.max ? b : a));

    return (
        <div className="min-h-screen bg-[#f3f6f2]">
            <div className="max-w-5xl mx-auto px-4 py-6">

                <nav className="text-xs text-gray-500 flex items-center gap-2 mb-5">
                    <Link href="/" className="hover:text-gray-800">হোম</Link>
                    <span>›</span>
                    <Link
                        href={`/categories/${product.category}`}
                        className="hover:text-gray-800"
                    >
                        {product.categoryNameBn}
                    </Link>
                    <span>›</span>
                    <span className="text-gray-700">{product.nameBn}</span>
                </nav>

                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl">
                            {product.image}
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-xs text-gray-500">
                                প্রতি {unit} · {product.categoryNameBn}
                            </p>
                            <p className="mt-1 text-sm text-gray-700">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span>
                                    {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                                </span>
                                {diff > 0 && <> · {fmt(diff)} টাকা</>}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-gray-50 border border-gray-100 px-5 py-3 text-center">
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {fmt(product.today)}
                        </p>
                        <p className="text-xs text-gray-500">টাকা / {unit}</p>
                        <p
                            className={`text-xs font-medium mt-1 ${
                                isUp
                                    ? "text-red-600"
                                    : isDown
                                    ? "text-green-600"
                                    : "text-gray-500"
                            }`}
                        >
                            {isUp ? "▲" : isDown ? "▼" : "–"} {fmt(product.change.pct)}%
                        </p>
                    </div>
                </div>

                <div className="mt-5 bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-base font-bold text-gray-900 mb-3">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
                            <p className="mt-1 text-xl font-bold text-green-600">
                                {fmt(minRow.min)}{" "}
                                <span className="text-sm font-medium">টাকা</span>
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
                            <p className="mt-1 text-xl font-bold text-red-600">
                                {fmt(maxRow.max)}{" "}
                                <span className="text-sm font-medium">টাকা</span>
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">গড় দাম</p>
                            <p className="mt-1 text-xl font-bold text-green-600">
                                {fmt(product.today)}{" "}
                                <span className="text-sm font-medium">টাকা</span>
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">
                                প্রতি {unit} এর হিসাবে
                            </p>
                        </div>
                    </div>

                    <h2 className="text-base font-bold text-gray-900 mt-6 mb-3">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium">বাজার</th>
                                    <th className="text-left px-4 py-3 font-medium">বিভাগ</th>
                                    <th className="text-right px-4 py-3 font-medium">সর্বনিম্ন</th>
                                    <th className="text-right px-4 py-3 font-medium">সর্বাধিক</th>
                                    <th className="text-right px-4 py-3 font-medium">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((m, i) => (
                                    <tr
                                        key={m.market}
                                        className={`border-t border-gray-200 ${
                                            i % 2 === 1 ? "bg-gray-50/60" : "bg-white"
                                        }`}
                                    >
                                        <td className="px-4 py-3 text-gray-800">{m.market}</td>
                                        <td className="px-4 py-3 text-gray-600">{m.division}</td>
                                        <td className="px-4 py-3 text-right">{fmt(m.min)} টাকা</td>
                                        <td className="px-4 py-3 text-right">{fmt(m.max)} টাকা</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-900">
                                            {fmt(m.avg)} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;