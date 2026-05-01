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

    useEffect(() => {
        loadTools();
    }, [activeTab]);

    async function loadTools() {
        const data = await getToolsByKategori(activeTab);
        setTools(data);
    }

    async function handleSave(toolData) {
        const session = getUserSession();

        if (!session?.is_admin) {
            alert('❌ Hanya admin yang bisa menambah/edit tool!');
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
            alert('❌ Hanya admin yang bisa menghapus tool!');
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
            alert('❌ Hanya admin yang bisa edit tool!');
            return;
        }

        setEditData(tool);
        setIsModalOpen(true);
    }

    return (
        <main className="ml-64 p-8 bg-linear-to-br from-blue-50 via-cyan-50 to-indigo-50 min-h-screen">
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Tools Milling
            </h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {['endmill', 'drill', 'tap', 'holder'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab
                            ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-white text-gray-700 border'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add Button */}
            <button
                onClick={() => {
                    setEditData(null);
                    setIsModalOpen(true);
                }}
                className="mb-4 px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg"
            >
                ➕ Add Tool
            </button>

            {/* Table */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <table className="w-full">
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
                            <tr key={tool.id} className="border-t hover:bg-blue-50">
                                <td className="p-3">{tool.nama_item}</td>
                                <td className="p-3">{tool.tipe}</td>
                                <td className="p-3 text-center font-semibold">{tool.jumlah}</td>
                                <td className="p-3">{tool.insert_type}</td>
                                <td className="p-3 text-center">{tool.insert_qty}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleEdit(tool)}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded mr-2"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tool.id)}
                                        className="px-3 py-1 bg-red-100 text-red-700 rounded"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
        </main>
    );
};

export default ToolsMillingPage;