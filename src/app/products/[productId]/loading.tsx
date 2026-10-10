import { Skeleton } from "@/Components/Skeleton";


const Loading = () => {
    return (
        <div className="min-h-screen bg-[#f3f6f2]">
            <div className="max-w-5xl mx-auto px-4 py-6">
                {/* breadcrumb */}
                <Skeleton className="h-4 w-48 mb-5" />

                {/* header card */}
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-16 h-16" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                    </div>
                    <Skeleton className="h-28 w-32" />
                </div>

                {/* summary + table */}
                <div className="mt-5 bg-white rounded-xl shadow-sm p-5">
                    <Skeleton className="h-5 w-32 mb-3" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>

                    <Skeleton className="h-5 w-40 mt-6 mb-3" />
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;