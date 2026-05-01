// components/ToolModal.jsx
'use client';

import { useState, useEffect } from 'react';

const ToolModal = ({ isOpen, onClose, onSave, kategori, editData = null }) => {
    const [formData, setFormData] = useState({
        kategori: kategori,
        nama_item: '',
        tipe: '',
        jumlah: 0,
        insert_type: '-',
        insert_qty: 0
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        } else {
            setFormData({
                kategori: kategori,
                nama_item: '',
                tipe: '',
                jumlah: 0,
                insert_type: '-',
                insert_qty: 0
            });
        }
    }, [editData, kategori]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    // Form berbeda per kategori
    const renderFormFields = () => {
        switch (kategori) {
            case 'endmill':
                return (
                    <>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Diameter (Ø)</label>
                            <select
                                value={formData.nama_item}
                                onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Diameter</option>
                                {[...Array(20)].map((_, i) => (
                                    <option key={i} value={`Ø${i + 1}`}>Ø{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Material</label>
                            <select
                                value={formData.tipe.split(' ')[0] || ''}
                                onChange={(e) => {
                                    const flute = formData.tipe.split(' ')[1] || '2F';
                                    setFormData({ ...formData, tipe: `${e.target.value} ${flute}` });
                                }}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Material</option>
                                <option value="HSS">HSS</option>
                                <option value="CARBIDE">CARBIDE</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Flute</label>
                            <select
                                value={formData.tipe.split(' ')[1] || ''}
                                onChange={(e) => {
                                    const material = formData.tipe.split(' ')[0] || 'HSS';
                                    setFormData({ ...formData, tipe: `${material} ${e.target.value}` });
                                }}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Flute</option>
                                <option value="2F">2 Flute</option>
                                <option value="3F">3 Flute</option>
                                <option value="4F">4 Flute</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah Stok</label>
                            <input
                                type="number"
                                value={formData.jumlah}
                                onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
                                required
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </>
                );

            case 'drill':
                return (
                    <>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Diameter (Ø)</label>
                            <select
                                value={formData.nama_item}
                                onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Diameter</option>
                                {[...Array(20)].map((_, i) => (
                                    <option key={i} value={`Ø${i + 1}`}>Ø{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Tipe Drill</label>
                            <select
                                value={formData.tipe}
                                onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Tipe</option>
                                <option value="HSS">HSS</option>
                                <option value="CARBIDE">CARBIDE</option>
                                <option value="SPOT">SPOT</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah Stok</label>
                            <input
                                type="number"
                                value={formData.jumlah}
                                onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
                                required
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </>
                );

            case 'tap':
                return (
                    <>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Size</label>
                            <select
                                value={formData.nama_item}
                                onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Size</option>
                                {['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M10', 'M12'].map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Material</label>
                            <select
                                value={formData.tipe}
                                onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Material</option>
                                <option value="HSS">HSS</option>
                                <option value="CARBIDE">CARBIDE</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah Stok</label>
                            <input
                                type="number"
                                value={formData.jumlah}
                                onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
                                required
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </>
                );

            case 'holder':
                return (
                    <>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Nama Tool Holder</label>
                            <input
                                type="text"
                                value={formData.nama_item}
                                onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="ARBOR BT-40 ER-32"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah</label>
                            <input
                                type="number"
                                value={formData.jumlah}
                                onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
                                required
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Insert Type (Opsional)</label>
                            <input
                                type="text"
                                value={formData.insert_type}
                                onChange={(e) => setFormData({ ...formData, insert_type: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="APMT 1135, - jika tidak ada"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Insert Qty (Opsional)</label>
                            <input
                                type="number"
                                value={formData.insert_qty}
                                onChange={(e) => setFormData({ ...formData, insert_qty: parseInt(e.target.value) })}
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <div className="rounded-t-2xl bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">
                        {editData ? '✏️ Edit' : '➕ Add'} {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    {renderFormFields()}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600"
                        >
                            {editData ? '💾 Update' : '✅ Simpan'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-300"
                        >
                            ❌ Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ToolModal;