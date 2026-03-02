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

    loadData();
}

// ===============================
// HAPUS DATA
// ===============================
async function hapusData(id) {

    const { error } = await supabaseClient
        .from("orders")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error.message);
        alert("Gagal hapus");
        return;
    }

    loadData();
}