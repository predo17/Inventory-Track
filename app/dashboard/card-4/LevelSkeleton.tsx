

export default function LevelSkeleton() {
    return (
        <div className="niveis h-full bg-gray-50 p-6 border-t border-gray-200 rounded-xl shadow-md lg:w-[92%]">
            <div className="flex items-center justify-between mb-6">
                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-white drop-shadow">
                        <div className="flex items-center space-x-3">
                            {/* Bolinha do status */}
                            <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>

                            {/* Nome do produto e status */}
                            <div className="space-y-1">
                                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Quantidade */}
                        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
