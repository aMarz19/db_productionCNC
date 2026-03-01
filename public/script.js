console.log("SCRIPT TERLOAD - SUPABASE MODE");

// ================= CONFIG =================
const SUPABASE_URL = "https://laocjpezzthwshbxbpmw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhb2NqcGV6enRod3NoYnhicG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNjY2MjcsImV4cCI6MjA4Nzk0MjYyN30.3Dpk5dT8aqWzfpEoo8omXmUPBm7_6kMgOk0wkoOFJaY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ================= ELEMENT =================
const modal = document.getElementById("loginModal");
const authButton = document.getElementById("authButton");
const orderTable = document.getElementById("orderTable");

// ================= MODAL =================


function openLogin() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "block";
}

function closeLogin() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "none";
}

// ================= LOGIN =================
async function login() {

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login gagal: " + error.message);
        return;
    }

    alert("Login berhasil");
    closeLogin();
    loadOrders();
}

// ================= LOGOUT =================
async function logout() {
    await supabase.auth.signOut();
    location.reload();
}

// ================= LOAD ORDERS =================
async function loadOrders() {

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
        orderTable.innerHTML = "";
        return;
    }

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("LOAD ERROR:", error);
        return;
    }

    orderTable.innerHTML = "";

    data.forEach((order, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.tanggal}</td>
            <td>${escapeHtml(order.nama_part)}</td>
            <td>${order.jumlah}</td>
            <td>
                <input type="checkbox"
                    ${order.done ? "checked" : ""}
            >
            </td>
        `;

        const checkbox = row.querySelector("input");
        checkbox.addEventListener("change", () => {
            toggleDone(order.id, checkbox.checked);
        });

        orderTable.appendChild(row);
    });
}



// ================= ADD ORDER =================
async function addOrder() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        alert("Harus login dulu.");
        openLogin();
        return;
    }

    const tanggal = document.getElementById("tanggal").value;
    const namaPart = document.getElementById("namaPart").value;
    const jumlah = document.getElementById("jumlah").value;

    if (!tanggal || !namaPart || !jumlah) {
        alert("Semua field wajib diisi");
        return;
    }

    const { error } = await supabase
        .from("orders")
        .insert([{ tanggal, nama_part: namaPart, jumlah }]);

    if (error) {
        console.error(error);
        alert("Gagal menyimpan order");
        return;
    }

    await loadOrders();
}

// ================= TOGGLE DONE =================
async function toggleDone(id, done) {
    const { error } = await supabase
        .from("orders")
        .update({ done })
        .eq("id", id);

    if (error) {
        alert("Gagal update status");
    }
}

// ================= AUTH CHECK =================
async function updateAuthUI() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
        authButton.innerText = "Logout";
        authButton.onclick = logout;
    } else {
        authButton.innerText = "Login";
        authButton.onclick = openLogin;
    }
}

// ================= INIT =================
(async function () {
    await updateAuthUI();

    const { data } = await supabase.auth.getUser();
    if (data.user) {
        await loadOrders();
    }
})();