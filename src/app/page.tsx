import BannerSection from "@/Components/banner";
import AllProducts from "@/Components/HomePageProducts/allProducts";
import ProductsSkeleton from "@/Components/ProductsSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <BannerSection />

      <Suspense fallback={<ProductsSkeleton />}>
                <AllProducts />
            </Suspense>
    </div>
  );
}