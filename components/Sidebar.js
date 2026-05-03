'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import FormLogin from "./FormLogin";
import { getUserSession, clearUserSession } from "@/lib/auth";

const navItems = [
    { href: "/Produksi", label: "Produksi", icon: "📦" },
    { href: "/ToolsMilling", label: "Tools Milling", icon: "🔧" },
    { href: "/ToolsLathe", label: "Tools Lathe", icon: "🛠️" }
];

const Sidebar = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const session = getUserSession();
        if (session) {
            setUserProfile(session);
        }
    }, []);

    const handleLogout = () => {
        clearUserSession();
        setUserProfile(null);
        alert("✅ Logout berhasil");
    };

    return (
        <>
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all md:hidden"
                aria-label="Buka sidebar">
                ☰
            </button>

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col overflow-y-auto bg-white border-r border-gray-200 p-6 shadow-lg transition-all duration-300 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:h-auto md:shrink-0 w-64 ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}>
                <div className="flex items-center justify-between gap-3 mb-8">
                    <Link
                        href="/"
                        className={`text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all ${isCollapsed ? 'truncate text-base' : ''}`}>
                        {isCollapsed ? 'CNC' : 'CNC Teaching Factory'}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsCollapsed((prev) => !prev)}
                        className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-gray-600 hover:bg-slate-200 md:inline-flex"
                        aria-label="Toggle sidebar">
                        {isCollapsed ? '➡️' : '⬅️'}
                    </button>
                </div>

                <nav className="flex-1 py-2">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 font-medium ${isCollapsed ? 'justify-center' : ''}`}>
                                    <span>{item.icon}</span>
                                    <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={`mt-auto ${isCollapsed ? 'w-full text-center' : ''}`}>
                    {!userProfile ? (
                        <button
                            onClick={() => {
                                setIsAuthOpen(true);
                                setMobileOpen(false);
                            }}
                            className={`w-full rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg ${isCollapsed ? 'py-3 px-0' : 'py-3 px-4'}`}>
                            {isCollapsed ? '🔐' : '🔐 Login'}
                        </button>
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold">
                                    {userProfile?.nama?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className={`${isCollapsed ? 'hidden' : ''}`}>
                                    <p className="font-semibold text-gray-800">{userProfile.nama}</p>
                                    <p className="text-xs text-gray-500">
                                        {userProfile.is_admin ? 'Admin' : 'User'}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full rounded-lg bg-red-500 text-white py-2 font-medium hover:bg-red-600 transition-all">
                                🚪 Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            <FormLogin
                isAuthOpen={isAuthOpen}
                setIsAuthOpen={setIsAuthOpen}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setUserProfile={setUserProfile}
            />
        </>
    );
};

export default Sidebar;
