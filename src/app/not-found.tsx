import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-green-500">404</h1>
      <p className="text-xl text-gray-700">দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি</p>
      <Link
        href="/"
        className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
      >
        হোমে ফিরে যান
      </Link>
    </div>
  );
}