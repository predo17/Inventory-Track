

export default function EfficiencySkeleton() {
    return (
        <div className="eficiencia bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-md h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col items-center justify-center">
                {/* Skeleton do Gráfico de Rosca */}
                <div className="w-full h-64 mb-2 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        {/* Círculo externo do gráfico */}
                        <div className="absolute inset-0 rounded-full border-8 border-gray-200 animate-pulse"></div>
                        {/* Círculo interno (vazio) */}
                        <div className="absolute inset-8 rounded-full bg-gray-100 animate-pulse"></div>
                        {/* Texto central */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="h-8 w-16 bg-gray-300 rounded animate-pulse mx-auto mb-1"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skeleton da Legenda */}
                <div className="w-full space-y-3 mt-3">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
