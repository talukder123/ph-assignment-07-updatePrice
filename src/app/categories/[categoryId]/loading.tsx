import { Skeleton } from "@/Components/Skeleton";

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

const Loading = () => (
    <div>
        {/* category heading card */}
        <div className="bg-white flex items-center max-w-7xl mx-auto mt-9 border border-gray-100 rounded-2xl p-5 gap-4">
            <Skeleton className="h-14 w-14" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-44" />
            </div>
        </div>

        {/* products grid */}
        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    </div>
);

export default Loading;