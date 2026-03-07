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
        const { data, error } = await supabaseClient
            .from("orders")
            .select("*")
            .gt("id", lastId) // hanya ambil data baru
            .order("id", { ascending: true }); // ascending supaya muncul di bawah

        if (error) throw error;

        // <button onclick="hapusData(${row.id})">Hapus</button>
        const tableBody = document.getElementById("orderTable");

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${tableBody.rows.length + 1}</td>
                <td>${row.tanggal}</td>
                <td>${row.nama_part}</td>
                <td>${row.jumlah}</td>
                <td>
                    <input type="checkbox" ${row.status ? "checked" : ""} onclick="updateStatus(${row.id}, this.checked)">
                </td>
                <td>
            <button onclick="editData(${row.id}, '${row.nama_part}', ${row.jumlah}, '${row.tanggal}')" style="color: blue; cursor: pointer; margin-right: 5px;">✏️</button>
            <button onclick="hapusData(${row.id})" style="color: red; cursor: pointer;">🗑️</button>
        </td>
            `;
            tableBody.appendChild(tr);

            lastId = row.id; // update lastId supaya next fetch lebih baru
        });

    } catch (err) {
        console.error(err.message);
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
                jumlah: parseInt(jumlah)
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

    //add code to show how fast the data is added to the table after insertion in console by time
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
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    const { error } = await supabaseClient
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {
        alert("Gagal hapus: " + error.message);
        return;
    }

    // Menghapus baris langsung dari tampilan tanpa reload seluruh tabel
    const rowElement = document.getElementById(`row-${id}`);
    if (rowElement) rowElement.remove();

    console.log(`Data dengan ID ${id} berhasil dihapus.`);
}

// ===============================
// UPDATE STATUS
// ===============================
async function editData(id, namaLama, jumlahLama, tanggalLama) {
    // Mengambil input baru dari user
    const namaBaru = prompt("Edit Nama Part:", namaLama);
    const jumlahBaru = prompt("Edit Jumlah:", jumlahLama);

    // Jika user menekan cancel atau tidak mengisi apapun, batalkan
    if (namaBaru === null || jumlahBaru === null) return;

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
        // Refresh halaman untuk melihat perubahan
        location.reload();
    }
}