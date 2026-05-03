'use client';

import { useState, useEffect } from 'react';
import { getToolsByKategori, addTool, updateTool, deleteTool } from '@/lib/ToolServices';
import { getUserSession } from '@/lib/auth';
import ToolModal from '@/components/ModalMilling';

const ToolsMillingPage = () => {
    const [activeTab, setActiveTab] = useState('endmill');
    const [tools, setTools] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(getUserSession());
        loadTools();
    }, [activeTab]);

    async function loadTools() {
        const data = await getToolsByKategori(activeTab);
        setTools(data);
    }

    async function handleSave(toolData) {
        const session = getUserSession();

        if (!session?.is_admin) {
            return;
        }

        if (editData) {
            // Update
            const result = await updateTool(editData.id, toolData);
            if (result.success) {
                alert('✅ Tool berhasil diupdate!');
                loadTools();
            } else {
                alert('❌ Gagal update: ' + result.error);
            }
        } else {
            // Create
            const result = await addTool(toolData);
            if (result.success) {
                alert('✅ Tool berhasil ditambahkan!');
                loadTools();
            } else {
                alert('❌ Gagal tambah: ' + result.error);
            }
        }

        setEditData(null);
    }

    async function handleDelete(id) {
        const session = getUserSession();

        if (!session?.is_admin) {
            return;
        }

        if (!confirm('Yakin ingin menghapus tool ini?')) return;

        const result = await deleteTool(id);
        if (result.success) {
            alert('✅ Tool berhasil dihapus!');
            loadTools();
        } else {
            alert('❌ Gagal hapus: ' + result.error);
        }
    }

    function handleEdit(tool) {
        const session = getUserSession();

        if (!session?.is_admin) {
            return;
        }

        setEditData(tool);
        setIsModalOpen(true);
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-semibold text-gray-900">Tools Milling</h1>
                    <p className="text-sm text-gray-600 mt-1">Kelola inventaris tools CNC dengan tampilan yang lebih sederhana.</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                {['endmill', 'drill', 'tap', 'holder'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add Button */}
            {session?.is_admin ? (
                <button
                    onClick={() => {
                        setEditData(null);
                        setIsModalOpen(true);
                    }}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Tambah Tool
                </button>
            ) : (
                <div className="mb-4 p-4 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 hidden">
                    Login sebagai admin untuk menambah, mengedit, atau menghapus tools.
                </div>
            )}

            {/* Table */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Tools</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Nama Item</th>
                            <th className="p-3 text-left">Tipe</th>
                            <th className="p-3 text-center">Jumlah</th>
                            <th className="p-3 text-left">Insert</th>
                            <th className="p-3 text-center">Qty Insert</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((tool) => (
                            <tr key={tool.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{tool.nama_item}</td>
                                <td className="p-3">{tool.tipe}</td>
                                <td className="p-3 text-center font-semibold text-gray-900">{tool.jumlah}</td>
                                <td className="p-3">{tool.insert_type}</td>
                                <td className="p-3 text-center">{tool.insert_qty}</td>
                                <td className="p-3 text-center">
                                    {session?.is_admin ? (
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(tool)}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tool.id)}
                                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-all"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-500">Terbatas</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>

            <ToolModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditData(null);
                }}
                onSave={handleSave}
                kategori={activeTab}
                editData={editData}
            />
            </div>
        </main>
    );
};

export default ToolsMillingPage;