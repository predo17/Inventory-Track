import { Skeleton } from "@/app/loading"

export default function SemanaSkeleton() {
    return (
        <div className="semana bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md h-full  animate-pulse">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-8 w-60"/>
            </div>
            <Skeleton className="h-48 "/>
        </div>
    )
}
