import { Skeleton } from "./Skeleton";

const CardSkeleton = () => (
    <div className="rounded-xl bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
        <Skeleton className="h-6 w-1/2" />
    </div>
);

const Section = () => (
    <div className="mt-7 sm:mt-9 first:mt-0">
        <div className="flex gap-2 items-center mb-3">
            <Skeleton className="h-7 w-7" />
            <Skeleton className="h-7 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    </div>
);

const ProductsSkeleton = () => (
    <div className="max-w-7xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8">
        <Section />
        <Section />
        <Section />
    </div>
);

export default ProductsSkeleton;