"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@stackframe/stack";
import { FaChartBar, FaRegChartBar } from "react-icons/fa";
import { LuPackage, LuSettings } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import MetricSkeleton from "./dashboard/card-1/MetricSkeleton";
import SemanaSkeleton from "./dashboard/card-2/SemanaSkeleton";
import EfficiencySkeleton from "./dashboard/card-3/EfficiencySkeleton";
import LevelSkeleton from "./dashboard/card-4/LevelSkeleton";
import { TiThMenuOutline } from "react-icons/ti";

// Skeleton component for loading states
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
}

// Sidebar component for loading state
function LoadingSidebar() {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FaRegChartBar, },
    { name: "Inventário", href: "/inventory", icon: LuPackage, },
    { name: "Adicionar Produtos", href: "/add-product", icon: FiPlus, },
    { name: "Sistema", href: "/settings", icon: LuSettings, }
  ];

  return (
    <>
      <div className="relative w-full py-2 px-4 bg-gray-900 flex items-center justify-between xl:hidden mb-6">
        <div className="flex items-center space-x-3 text-white">
          <FaChartBar className="w-7 h-7" />
          <div className="text-xl leading-tight">Inventory track</div>
        </div>

        <button
          aria-label="Abrir Menu"
          className="p-2 rounded-md text-white"
          type="button"
        >
          <TiThMenuOutline className="w-6 h-6" />
        </button>
      </div>


      <div className="fixed left-0 top-0 bg-gray-800 text-white w-60 min-h-screen p-4 z-10 hidden xl:block">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FaChartBar className="w-7 h-7" />
            <div className="text-xl text-gradient">Inventory track</div>
          </div>
        </div>

        <nav className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-400 uppercase ">
            Funções
          </h2>
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-400"
              >
                <IconComponent className="w-5 h-5 mr-3" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <UserButton />
            </div>
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Main content skeleton
function MainContentSkeleton({
  showSidebar = true,
}: {
  showSidebar?: boolean;
}) {
  return (
    <div className="container min-h-screen">
    <main className={`${showSidebar ? "md:mx-0 xl:ml-60 p-3 lg:p-6" : "p-6"}`}>
      {/* Header skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="relative">
        <div className="grid-layout">
          <MetricSkeleton />
          <SemanaSkeleton />
          <EfficiencySkeleton />
          <LevelSkeleton />
        </div>
      </div>
    </main>
    </div>
  );
}

export default function Loading() {
  const pathname = usePathname();

  // Don't show sidebar on public routes
  const showSidebar = !["/", "/sign-in", "/sign-up"].includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar && <LoadingSidebar />}
      <MainContentSkeleton showSidebar={showSidebar} />
    </div>
  );
}