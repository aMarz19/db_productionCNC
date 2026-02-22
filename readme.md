# Sparepart Dashboard

## Deskripsi

Sparepart Dashboard adalah aplikasi web untuk memantau dan mengelola orderan sparepart secara real-time.  
Aplikasi ini dibangun menggunakan **Node.js (Express)** untuk backend, **MySQL** sebagai database, dan **HTML/JavaScript** untuk frontend.  

Fitur tambahan:

- Login berbasis session (dicek ke database MySQL)
- Input order baru melalui form
- Tabel order menampilkan semua order terakhir
- Checklist untuk menandai order sudah selesai
- Notifikasi otomatis ke **Telegram** ketika order baru ditambahkan

Aplikasi ini cocok untuk pabrik, workshop, atau gudang yang ingin memantau order sparepart secara sederhana namun real-time.

---

## Fitur

1. **Login & Logout**
   - Cross-check username/password ke database MySQL
   - Session login menjaga akses ke fitur tambah order

2. **Input Order**
   - Masukkan tanggal, nama part, dan jumlah
   - Data tersimpan di MySQL
   - Tabel langsung update setelah insert

3. **Tabel Order**
   - Menampilkan semua order terbaru
   - Checkbox untuk menandai order selesai (`done`)

4. **Telegram Notification**
   - Ketika order baru ditambahkan, server otomatis mengirim notifikasi ke chat Telegram

---

## Struktur Project
