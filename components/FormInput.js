'use client';

import { useState } from 'react';

const FormInput = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    tanggal: '',
    nama_part: '',
    jumlah: ''
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ tanggal: '', nama_part: '', jumlah: '' });
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <span className="text-xl">➕</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Tambah Data Produksi</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Produksi
          </label>
          <input
            type="date"
            value={formData.tanggal}
            onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Part
          </label>
          <input
            type="text"
            value={formData.nama_part}
            onChange={(e) => setFormData({ ...formData, nama_part: e.target.value })}
            placeholder="Masukkan nama part"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Unit
          </label>
          <input
            type="number"
            value={formData.jumlah}
            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
            placeholder="0"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            💾 Simpan Data
          </button>
        </div>
      </div>
    </section>
  );
}

export default FormInput;