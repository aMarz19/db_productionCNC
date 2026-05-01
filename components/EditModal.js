'use client';

import { useState, useEffect } from 'react';

const EditModal = ({ data, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        tanggal: '',
        nama_part: '',
        jumlah: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id,
                tanggal: data.tanggal,
                nama_part: data.nama_part,
                jumlah: data.jumlah
            });
        }
    }, [data]);

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white">✏️ Edit Data Produksi</h3>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                        <input
                            type="date"
                            value={formData.tanggal}
                            onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Part</label>
                        <input
                            type="text"
                            value={formData.nama_part}
                            onChange={(e) => setFormData({ ...formData, nama_part: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                        <input
                            type="number"
                            value={formData.jumlah}
                            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                            💾 Simpan
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                        >
                            ❌ Batal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;