'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

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
    <Modal isOpen={!!data} title="✏️ Edit Data Produksi" onClose={onClose}>
      <div className="space-y-4">
        <InputField
          id="edit-tanggal"
          label="Tanggal"
          type="date"
          value={formData.tanggal}
          onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
        />

        <InputField
          id="edit-nama-part"
          label="Nama Part"
          type="text"
          value={formData.nama_part}
          onChange={(e) => setFormData({ ...formData, nama_part: e.target.value })}
        />

        <InputField
          id="edit-jumlah"
          label="Jumlah"
          type="number"
          value={formData.jumlah}
          onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" onClick={handleSave} className="flex-1">
            💾 Simpan
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            ❌ Batal
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
