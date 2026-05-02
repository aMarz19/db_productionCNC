'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import EditModal from '@/components/EditModal';
import FormInput from '@/components/FormInput';
import ProduksiTable from '@/components/ProduksiTable';
import StatsCards from '@/components/StatsCard';
import StockTable from '@/components/StockTable';
import { getUserSession } from '@/lib/auth';


const ProduksiPage = () => {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalProduksi: 0,
        totalJenis: 0,
        bulanIni: 0
    });
    const [stokData, setStokData] = useState({});
    const [editModalData, setEditModalData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);

    // Load data saat komponen mount
    useEffect(() => {
        setSession(getUserSession());
        loadData();
    }, []);

    // Load semua data
    async function loadData() {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            setOrders(data);
            calculateStats(data);
            calculateStok(data);
        } catch (err) {
            console.error('Error load data:', err.message);
        } finally {
            setIsLoading(false);
        }
    }

    // Hitung statistik
    function calculateStats(data) {
        // Total Produksi
        const totalProduksi = data.reduce((sum, row) => sum + (row.jumlah || 0), 0);

        // Total Jenis (unique parts)
        const uniqueParts = new Set(data.map(row => row.nama_part));
        const totalJenis = uniqueParts.size;

        // Produksi Bulan Ini
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const bulanIni = data
            .filter(row => {
                const tanggal = new Date(row.tanggal);
                return tanggal >= startOfMonth && tanggal <= endOfMonth;
            })
            .reduce((sum, row) => sum + (row.jumlah || 0), 0);

        setStats({ totalProduksi, totalJenis, bulanIni });
    }

    // Hitung stok
    function calculateStok(data) {
        const stokMap = {};
        data.forEach(row => {
            const key = row.nama_part;
            stokMap[key] = (stokMap[key] || 0) + row.jumlah;
        });
        setStokData(stokMap);
    }

    // Tambah order baru
    async function addOrder(formData) {
        const session = getUserSession();

        if (!session?.is_admin) {
            alert('❌ Hanya admin yang bisa menambah data!');
            return;
        }

        const { tanggal, nama_part, jumlah } = formData;

        if (!tanggal || !nama_part || !jumlah) {
            alert('Semua field harus diisi!');
            return;
        }

        if (isNaN(jumlah) || parseInt(jumlah) <= 0) {
            alert('Jumlah harus berupa angka positif!');
            return;
        }

        try {
            const { error } = await supabase
                .from('orders')
                .insert([
                    {
                        tanggal,
                        nama_part,
                        jumlah: parseInt(jumlah),
                        status: false
                    }
                ]);

            if (error) throw error;

            try {
                await fetch('https://laocjpezzthwshbxbpmw.supabase.co/functions/v1/tele_bot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                    },
                    body: JSON.stringify({ tanggal, nama_part, jumlah })
                });
            } catch (err) {
                console.error('Telegram error:', err);
            }

            await loadData();
            alert('✅ Data berhasil disimpan!');
        } catch (err) {
            alert('Gagal simpan: ' + err.message);
        }
    }

    // Hapus data
    // Hapus data
    async function hapusData(id) {
        const session = getUserSession();

        if (!session?.is_admin) {
            alert('❌ Hanya admin yang bisa menghapus data!');
            return;
        }

        if (!confirm('Yakin ingin menghapus data ini?')) return;

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id);

            if (error) throw error;

            await loadData();
            alert('✅ Data berhasil dihapus');
        } catch (err) {
            alert('Gagal hapus: ' + err.message);
        }
    }

    // Update status
    async function updateStatus(id, newStatus) {
        const session = getUserSession();

        if (!session?.is_admin) {
            alert('❌ Hanya admin yang bisa mengubah status!');
            return;
        }

        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            await loadData();
            alert('Status berhasil diperbarui!');
        } catch (err) {
            alert('Gagal update status: ' + err.message);
        }
    }


    // Buka modal edit
    function openEditModal(order) {
        const session = getUserSession();

        if (!session?.is_admin) {
            alert('❌ Hanya admin yang bisa mengedit data!');
            return;
        }

        setEditModalData(order);
    }

    // Tutup modal edit
    function closeEditModal() {
        setEditModalData(null);
    }

    // Simpan edit
    async function saveEdit(editedData) {
        const session = getUserSession();

        if (!session?.is_admin) {
            alert('❌ Hanya admin yang bisa mengedit data!');
            return;
        }

        const { id, tanggal, nama_part, jumlah } = editedData;

        if (!nama_part || !jumlah || !tanggal) {
            alert('Data tidak boleh kosong!');
            return;
        }

        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    tanggal,
                    nama_part,
                    jumlah: parseInt(jumlah)
                })
                .eq('id', id);

            if (error) throw error;

            await loadData();
            closeEditModal();
            alert('Data berhasil diperbarui!');
        } catch (err) {
            alert('Gagal update: ' + err.message);
        }
    }

    return (


        <div className="min-h-screen bg-gray-50 p-8 ml-64">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard Produksi</h2>
                    <p className="text-gray-600 mt-1">Kelola data produksi CNC Anda</p>
                </div>

                {/* Form Input */}
                {session?.is_admin ? (
                    <FormInput onSubmit={addOrder} />
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 text-gray-600 hidden">
                        <p className="font-medium">Login sebagai admin untuk menambahkan, mengedit, atau menghapus data.</p>
                    </div>
                )}

                {/* Stats Cards */}
                <StatsCards stats={stats} />

                {/* Rekap Stok */}
                <StockTable stokData={stokData} />

                {/* Data Produksi */}
                <ProduksiTable
                    orders={orders}
                    onEdit={openEditModal}
                    onDelete={hapusData}
                    onStatusChange={updateStatus}
                    isLoading={isLoading}
                    isAdmin={session?.is_admin}
                />

                {/* Edit Modal */}
                {editModalData && (
                    <EditModal
                        data={editModalData}
                        onSave={saveEdit}
                        onClose={closeEditModal}
                    />
                )}
            </div>
        </div>

    );
}

export default ProduksiPage;