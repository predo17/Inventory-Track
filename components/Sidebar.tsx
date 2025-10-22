"use client"

import { UserButton } from "@stackframe/stack";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChartBar, FaRegChartBar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LuPackage, LuSettings } from "react-icons/lu";
import { TiThMenuOutline } from "react-icons/ti";


export default function Sidebar({
    currentPath = "/dashboard",
}: {
    currentPath: string;
}) {

    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        setOpenSidebar(false);
    }, [currentPath])

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: FaRegChartBar, },
        { name: "Inventário", href: "/inventory", icon: LuPackage, },
        { name: "Adicionar Produtos", href: "/add-product", icon: FiPlus, },
        { name: "Sistema", href: "/settings", icon: LuSettings, }
    ]

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }


    return (
        <>
            <header className="relative w-full py-2 px-4 bg-gray-900 flex items-center justify-between xl:hidden mb-6">
                <div className="flex items-center space-x-3 text-white">
                    <FaChartBar className="w-7 h-7" />
                    <div className="text-xl leading-tight">Inventory track</div>
                </div>

                <button
                    aria-label="Abrir Menu"
                    className="p-2 rounded-md text-white"
                    onClick={toggleSidebar}
                    type="button"
                >
                    <TiThMenuOutline className="w-6 h-6" />
                </button>

            </header>

            {openSidebar && <div className="fixed inset-0 bg-black/40 z-20 xl:hidden" onClick={() => setOpenSidebar(false)} />}

            <aside className={`min-h-screen w-64 fixed top-0 left-0 bg-gray-900 p-4  text-white z-30 transition-transform duration-300 xl:hidden ${openSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <FaChartBar className="w-7 h-7" />
                        <div className="text-xl text-gradient">Inventory track</div>
                    </div>
                </div>

                <div className="flex flex-col justify-between space-y-3">
                    <nav className="space-y-1">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase">Funções</h2>

                        {navigation.map((item) => {
                            const isActive = currentPath === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={
                                        `flex items-center py-2 px-3 text-sm font-medium rounded-lg transition-colors hover:bg-gray-800 ${isActive ? "bg-gray-800" : "text-gray-400 hover:text-white"
                                        }`
                                    }
                                    onClick={() => setOpenSidebar(false)}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-3 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                            <UserButton showUserInfo />
                        </div>
                    </div>
                </div>
            </aside >
            {/* Sidebar para desktop */}
            <aside className="min-h-screen w-20 lg:w-60 fixed top-0 left-0 bg-gray-900 p-4 text-white z-10 hidden xl:block">
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <FaChartBar className="w-7 h-7" />
                        <div className="text-xl text-gradient">Inventory track</div>
                    </div>
                </div>

                <nav className="space-y-1">
                    <h2 className="text-sm font-semibold text-gray-400 uppercase">Funções</h2>

                    {navigation.map((item) => {
                        const isActive = currentPath === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={
                                    `flex items-center py-2 px-3 text-sm font-medium rounded-lg transition-colors hover:bg-gray-800 ${isActive ? "bg-gray-800" : "text-gray-400 hover:text-white"
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                        <UserButton showUserInfo />
                    </div>
                </div>
            </aside >
        </>
    )
}