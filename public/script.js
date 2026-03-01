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

// ===============================
// AMBIL DATA DARI SUPABASE
// ===============================
async function loadData() {

    const { data, error } = await supabaseClient
        .from("produksi")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("Error load data:", error.message);
        return;
    }

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    data.forEach(row => {
        tableBody.innerHTML += `
            <tr>
                <td>${row.tanggal}</td>
                <td>${row.operator}</td>
                <td>${row.mesin}</td>
                <td>${row.qty}</td>
                <td>
                    <button onclick="deleteData(${row.id})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// TAMBAH DATA
// ===============================
async function tambahData() {

    const tanggal = document.getElementById("tanggal").value;
    const operator = document.getElementById("operator").value;
    const mesin = document.getElementById("mesin").value;
    const qty = document.getElementById("qty").value;

    if (!tanggal || !operator || !mesin || !qty) {
        alert("Semua field harus diisi");
        return;
    }

    const { error } = await supabaseClient
        .from("produksi")
        .insert([
            { tanggal, operator, mesin, qty }
        ]);

    if (error) {
        console.error("Error insert:", error.message);
        alert("Gagal simpan data");
        return;
    }

    alert("Data berhasil ditambahkan");
    loadData();
}

// ===============================
// HAPUS DATA
// ===============================
async function deleteData(id) {

    if (!confirm("Yakin hapus data ini?")) return;

    const { error } = await supabaseClient
        .from("produksi")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error delete:", error.message);
        alert("Gagal hapus data");
        return;
    }

    loadData();
}