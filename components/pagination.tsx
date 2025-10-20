import Link from "next/link";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
    currentPage: number,
    totalpages: number,
    baseUrl: string,
    searchParams: Record<string, string>
}


export default function Pagination({ currentPage, totalpages, baseUrl, searchParams }: PaginationProps) {
    if (totalpages <= 1) return null;

    const getPageUrl = (page: number) => {
        const params = new URLSearchParams({ ...searchParams, page: String(page) });
        return `${baseUrl}?${params.toString()}`;
    }

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalpages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalpages - 1) {
            rangeWithDots.push("...", totalpages);
        } else {
            rangeWithDots.push(totalpages);
        }

        return rangeWithDots;
    }

    const visiblePages = getVisiblePages();

    return (
        <nav className="flex items-center justify-center gap-1">
            <Link
                href={getPageUrl(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${currentPage <= 1 ? "text-gray-400 hidden bg-gray-100 focus:outline-0" : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-200 focus:outline-purple-600"}`}
            >
                <LuChevronLeft size={18} /> Voltar
            </Link>

            {visiblePages.map((page, key) => {
                if (page === "...") {
                    return (
                        <span key={key} className="px-3 py-2 text-sm text-gray-500">...</span>
                    )
                }

                const pageNumber = page as number;
                const isCurrentPage = pageNumber === currentPage;

                return (
                    <Link
                        key={key}
                        href={getPageUrl(pageNumber)}
                        className={`px-3 py-2 font-medium text-sm rounded-lg ${isCurrentPage ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100 border border-gray-300 focus:outline-purple-600"}`}
                    >{pageNumber}</Link>
                )
            })}

            <Link
                href={getPageUrl(currentPage + 1)}
                aria-disabled={currentPage >= totalpages}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${currentPage >= totalpages ? " text-gray-400 hidden bg-gray-100" : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-200 focus:outline-purple-600"}`}
            >
                Proxímo
                <LuChevronRight size={18} />
            </Link>
        </nav>
    )
}

