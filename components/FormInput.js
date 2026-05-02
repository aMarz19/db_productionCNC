'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

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
        <InputField
          id="tanggal-produksi"
          label="Tanggal Produksi"
          type="date"
          value={formData.tanggal}
          onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
        />

        <InputField
          id="nama-part"
          label="Nama Part"
          type="text"
          value={formData.nama_part}
          placeholder="Masukkan nama part"
          onChange={(e) => setFormData({ ...formData, nama_part: e.target.value })}
        />

        <InputField
          id="jumlah-unit"
          label="Jumlah Unit"
          type="number"
          value={formData.jumlah}
          placeholder="0"
          min="1"
          onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
        />

        <div className="flex items-end">
          <Button type="button" fullWidth onClick={handleSubmit}>
            💾 Simpan Data
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormInput;
