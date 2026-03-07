console.log("SCRIPT TERLOAD - SUPABASE MODE");

// ================= CONFIG =================
const SUPABASE_URL = "https://laocjpezzthwshbxbpmw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhb2NqcGV6enRod3NoYnhicG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNjY2MjcsImV4cCI6MjA4Nzk0MjYyN30.3Dpk5dT8aqWzfpEoo8omXmUPBm7_6kMgOk0wkoOFJaY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ================= ELEMENT =================
const orderTable = document.getElementById("orderTable");

// ===============================
// LOAD DATA SAAT HALAMAN DIBUKA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

let lastId = 0; // ID terakhir yang sudah ada di tabel

async function loadData() {
    try {
        // AMBIL SEMUA DATA (Jangan pakai .gt(id) saat pertama kali load halaman)
        const { data, error } = await supabaseClient
            .from("orders")
            .select("*")
            .order("id", { ascending: true });

        if (error) throw error;

        const tableBody = document.getElementById("orderTable");
        tableBody.innerHTML = ""; // KOSONGKAN TABEL agar tidak dobel/salah status

        data.forEach((row, index) => {
            const tr = document.createElement("tr");
            tr.setAttribute("id", `row-${row.id}`);

            // Paksa konversi ke boolean untuk memastikan checked bekerja
            const isChecked = row.status ? "checked" : "";

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.tanggal}</td>
                <td>${row.nama_part}</td>
                <td>${row.jumlah}</td>
                <td>
                    <input type="checkbox" ${isChecked} 
                        onclick="updateStatus(${row.id}, this.checked)">
                </td>
                <td>
                    <button onclick="editData(${row.id}, '${row.nama_part}', ${row.jumlah})" style="cursor:pointer;">✏️</button>
                    <button onclick="hapusData(${row.id})" style="color:red; cursor:pointer;">🗑️</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

    } catch (err) {
        console.error("Error load data:", err.message);
    }
}

// ===============================
// TAMBAH DATA
// ===============================
async function addOrder() {

    const tanggal = document.getElementById("tanggal").value;
    const nama_part = document.getElementById("namaPart").value;
    const jumlah = document.getElementById("jumlah").value;

    const { error } = await supabaseClient
        .from("orders")
        .insert([
            {
                tanggal: tanggal,
                nama_part: nama_part,
                jumlah: parseInt(jumlah),
                done: false
            }
        ]);

    if (error) {
        alert("Gagal simpan: " + error.message);
        return;
    }

    // 🔥 PANGGIL EDGE FUNCTION
    try {
        await fetch("https://laocjpezzthwshbxbpmw.supabase.co/functions/v1/tele_bot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "apikey": SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                tanggal,
                nama_part: nama_part,
                jumlah
            })
        });
    } catch (err) {
        console.error("Telegram error:", err);
    }

    //counting time load data
    const startTime = performance.now();
    loadData().then(() => {
        const endTime = performance.now();
        console.log(`Data loaded in ${endTime - startTime} milliseconds`);
    });
}

// ===============================
// HAPUS DATA
// ===============================
async function hapusData(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
        const { error } = await supabaseClient
            .from("orders")
            .delete()
            .eq("id", id);

        if (error) throw error;

        // Hapus baris dari tabel secara langsung (tanpa reload)
        const rowElement = document.getElementById(`row-${id}`);
        if (rowElement) {
            rowElement.remove();
            alert("Data berhasil dihapus");
        }
    } catch (err) {
        alert("Gagal hapus: " + err.message);
    }
}

// ===============================
// UPDATE STATUS (CHECKBOX)
// ===============================
async function updateStatus(id, newStatus) {
    const { error } = await supabaseClient
        .from("orders")
        .update({ done: newStatus })
        .eq("id", id);

    if (error) {
        alert("Gagal update status: " + error.message);
        location.reload();
    } else {
        console.log(`Berhasil! ID ${id} sekarang ${newStatus}`);
    }
}

// ===============================
// LOGIKA MODAL EDIT
// ===============================

// 1. Membuka modal dan mengisi data lama ke input
function editData(id, nama, jumlah) {
    document.getElementById("editId").value = id;
    document.getElementById("editNamaPart").value = nama;
    document.getElementById("editJumlah").value = jumlah;
    document.getElementById("editModal").style.display = "block";
}

// 2. Menutup modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// 3. Menyimpan perubahan ke Supabase
async function saveEdit() {
    const id = document.getElementById("editId").value;
    const namaBaru = document.getElementById("editNamaPart").value;
    const jumlahBaru = document.getElementById("editJumlah").value;

    if (!namaBaru || !jumlahBaru) {
        alert("Data tidak boleh kosong!");
        return;
    }

    const { error } = await supabaseClient
        .from("orders")
        .update({
            nama_part: namaBaru,
            jumlah: parseInt(jumlahBaru)
        })
        .eq("id", id);

    if (error) {
        alert("Gagal update: " + error.message);
    } else {
        alert("Data berhasil diperbarui!");
        closeModal();
        location.reload(); // Refresh untuk sinkronisasi data
    }
}

// Tambahan: Tutup modal jika user klik di luar area kotak modal
window.onclick = function (event) {
    const modal = document.getElementById("editModal");
    if (event.target == modal) {
        closeModal();
    }
}