'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';

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

  const renderFormFields = () => {
    switch (kategori) {
      case 'endmill':
        return (
          <>
            <SelectField
              id="endmill-diameter"
              label="Diameter (Ø)"
              value={formData.nama_item}
              onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
              options={[...Array(20)].map((_, i) => ({ value: `Ø${i + 1}`, label: `Ø${i + 1}` }))}
              placeholder="Pilih Diameter"
              required
            />

            <SelectField
              id="endmill-material"
              label="Material"
              value={formData.tipe.split(' ')[0] || ''}
              onChange={(e) => {
                const flute = formData.tipe.split(' ')[1] || '2F';
                setFormData({ ...formData, tipe: `${e.target.value} ${flute}` });
              }}
              options={[
                { value: 'HSS', label: 'HSS' },
                { value: 'CARBIDE', label: 'CARBIDE' }
              ]}
              placeholder="Pilih Material"
              required
            />

            <SelectField
              id="endmill-flute"
              label="Flute"
              value={formData.tipe.split(' ')[1] || ''}
              onChange={(e) => {
                const material = formData.tipe.split(' ')[0] || 'HSS';
                setFormData({ ...formData, tipe: `${material} ${e.target.value}` });
              }}
              options={[
                { value: '2F', label: '2 Flute' },
                { value: '3F', label: '3 Flute' },
                { value: '4F', label: '4 Flute' }
              ]}
              placeholder="Pilih Flute"
              required
            />

            <InputField
              id="endmill-jumlah"
              label="Jumlah Stok"
              type="number"
              min="0"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
              required
            />
          </>
        );

      case 'drill':
        return (
          <>
            <SelectField
              id="drill-diameter"
              label="Diameter (Ø)"
              value={formData.nama_item}
              onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
              options={[...Array(20)].map((_, i) => ({ value: `Ø${i + 1}`, label: `Ø${i + 1}` }))}
              placeholder="Pilih Diameter"
              required
            />

            <SelectField
              id="drill-tipe"
              label="Tipe Drill"
              value={formData.tipe}
              onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
              options={[
                { value: 'HSS', label: 'HSS' },
                { value: 'CARBIDE', label: 'CARBIDE' },
                { value: 'SPOT', label: 'SPOT' }
              ]}
              placeholder="Pilih Tipe"
              required
            />

            <InputField
              id="drill-jumlah"
              label="Jumlah Stok"
              type="number"
              min="0"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
              required
            />
          </>
        );

      case 'tap':
        return (
          <>
            <SelectField
              id="tap-size"
              label="Size"
              value={formData.nama_item}
              onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
              options={['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M10', 'M12'].map((m) => ({ value: m, label: m }))}
              placeholder="Pilih Size"
              required
            />

            <SelectField
              id="tap-material"
              label="Material"
              value={formData.tipe}
              onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
              options={[
                { value: 'HSS', label: 'HSS' },
                { value: 'CARBIDE', label: 'CARBIDE' }
              ]}
              placeholder="Pilih Material"
              required
            />

            <InputField
              id="tap-jumlah"
              label="Jumlah Stok"
              type="number"
              min="0"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
              required
            />
          </>
        );

      case 'holder':
        return (
          <>
            <InputField
              id="holder-nama"
              label="Nama Tool Holder"
              type="text"
              value={formData.nama_item}
              onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
              placeholder="ARBOR BT-40 ER-32"
              required
            />

            <InputField
              id="holder-jumlah"
              label="Jumlah"
              type="number"
              min="0"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) })}
              required
            />

            <InputField
              id="holder-insert-type"
              label="Insert Type (Opsional)"
              type="text"
              value={formData.insert_type}
              onChange={(e) => setFormData({ ...formData, insert_type: e.target.value })}
              placeholder="APMT 1135, - jika tidak ada"
            />

            <InputField
              id="holder-insert-qty"
              label="Insert Qty (Opsional)"
              type="number"
              min="0"
              value={formData.insert_qty}
              onChange={(e) => setFormData({ ...formData, insert_qty: parseInt(e.target.value) })}
            />
          </>
        );

      default:
        return (
          <>
            <InputField
              id="tool-nama"
              label="Nama Tool"
              type="text"
              value={formData.nama_item}
              onChange={(e) => setFormData({ ...formData, nama_item: e.target.value })}
              required
            />

            <InputField
              id="tool-jumlah"
              label="Jumlah"
              type="number"
              min="0"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 0 })}
              required
            />

            <InputField
              id="tool-insert-type"
              label="Insert Type (Opsional)"
              type="text"
              value={formData.insert_type}
              onChange={(e) => setFormData({ ...formData, insert_type: e.target.value })}
              placeholder="APMT 1135, - jika tidak ada"
            />

            <InputField
              id="tool-insert-qty"
              label="Insert Qty (Opsional)"
              type="number"
              min="0"
              value={formData.insert_qty}
              onChange={(e) => setFormData({ ...formData, insert_qty: parseInt(e.target.value) || 0 })}
            />
          </>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`${editData ? 'Edit' : 'Tambah'} ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormFields()}

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {editData ? 'Update' : 'Simpan'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ToolModal;
