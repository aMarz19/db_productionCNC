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

async function loadData() {

    const { data, error } = await supabaseClient
        .from("produksi")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error(error.message);
        return;
    }

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    data.forEach(row => {
        tableBody.innerHTML += `
            <tr>
                <td>${row.tanggal}</td>
                <td>${row.nama_part}</td>
                <td>${row.jumlah}</td>
                <td>
                    <button onclick="hapusData(${row.id})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// TAMBAH DATA
// ===============================
async function addOrder() {

    const tanggal = document.getElementById("tanggal").value;
    const namaPart = document.getElementById("namaPart").value;
    const jumlah = document.getElementById("jumlah").value;

    if (!tanggal || !namaPart || !jumlah) {
        alert("Semua field harus diisi");
        return;
    }

    const { error } = await supabaseClient
        .from("produksi")
        .insert([
            {
                tanggal: tanggal,
                nama_part: namaPart,
                jumlah: parseInt(jumlah)
            }
        ]);

    if (error) {
        console.error("ERROR DETAIL:", error);
        alert("Gagal simpan: " + error.message);
        return;
    }

    loadData();
}

// ===============================
// HAPUS DATA
// ===============================
async function hapusData(id) {

    const { error } = await supabaseClient
        .from("produksi")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error.message);
        alert("Gagal hapus");
        return;
    }

    loadData();
}