

export default function MetricSkeleton() {
    return (
        <div className="metrica">
            <div className="grid grid-cols-1 grid-rows-2 gap-3">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="relative overflow-hidden bg-gray-50  rounded-xl shadow-lg border border-gray-200 animate-pulse">
                        <div className="absolute -right-6 -bottom-6 opacity-20">
                            <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
                        </div>

                        <div className="relative p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                                <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                            </div>

                            <div className="h-8 w-16 bg-gray-300 rounded mb-2 ml-2"></div>
                            <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
