'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import FormLogin from "./FormLogin";
import { getUserSession, clearUserSession } from "@/lib/auth";

const Sidebar = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

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
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-6 shadow-lg">
                <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    <Link href="/">CNC Teaching Factory</Link>
                </h2>

                <nav className="py-8">
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/Produksi"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium">
                                <span>📦</span>
                                <span>Produksi</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/ToolsMilling"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 font-medium">
                                <span>🔧</span>
                                <span>Tools Milling</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="absolute bottom-8 left-6 right-6">
                    {!userProfile ? (
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="w-full rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white py-3 font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg">
                            🔐 Login
                        </button>
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold">
                                    {userProfile?.nama?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{userProfile.nama}</p>
                                    <p className="text-xs text-gray-500">
                                        {userProfile.is_admin ? "Admin" : "User"}
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