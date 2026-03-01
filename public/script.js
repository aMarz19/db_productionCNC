// ================= script.js =================
console.log("SCRIPT TERLOAD");

// ================= ELEMENT =================
const modal = document.getElementById("loginModal");
const authButton = document.getElementById("authButton");
const orderTable = document.getElementById("orderTable");

// ================= MODAL LOGIN =================
function openLogin() {
    modal.style.display = "flex";
}

function closeLogin() {
    modal.style.display = "none";
}

// ================= LOGIN =================
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Username dan password wajib diisi");
        return;
    }

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin", // 🔥 wajib
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success) {
            closeLogin();
            authButton.innerText = "Logout";
            authButton.onclick = logout;
            await loadOrders();
        } else {
            alert("Login gagal");
        }
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        alert("Terjadi kesalahan saat login");
    }
}

// ================= LOGOUT =================
async function logout() {
    try {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin",
        });
        location.reload();
    } catch (err) {
        console.error("LOGOUT ERROR:", err);
    }
}

// ================= LOAD ORDERS =================
// ================= LOAD ORDERS =================
async function loadOrders() {
    try {
        const res = await fetch("/api/orders", {
            method: "GET",
            credentials: "same-origin",
        });

        if (res.status !== 200) {
            console.error("Gagal mengambil data order");
            return;
        }

        const orders = await res.json();

        // Clear tabel
        orderTable.innerHTML = "";

        orders.forEach((order, index) => {
            orderTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.tanggal.toString().split("T")[0]}</td>
                <td>${order.nama_part}</td>
                <td>${order.jumlah}</td>
                <td>
                    <input type="checkbox" ${order.done ? "checked" : ""} 
                        onchange="toggleDone(${order.id}, this.checked)">
                </td>
            </tr>
            `;
        });
    } catch (err) {
        console.error("LOAD ORDERS ERROR:", err);
    }
}

// ================= TOGGLE DONE =================
async function toggleDone(orderId, checked) {
    try {
        const res = await fetch("/api/orders/done", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ id: orderId, done: checked }),
        });

        const data = await res.json();
        if (!data.success) {
            alert("Gagal update status order");
        }
    } catch (err) {
        console.error("TOGGLE DONE ERROR:", err);
    }
}

// ================= ADD ORDER =================
async function addOrder() {
    const tanggal = document.getElementById("tanggal").value;
    const namaPart = document.getElementById("namaPart").value;
    const jumlah = document.getElementById("jumlah").value;

    if (!tanggal || !namaPart || !jumlah) {
        alert("Semua field wajib diisi");
        return;
    }

    try {
        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ tanggal, namaPart, jumlah }),
        });

        const data = await res.json();

        if (data.success) {
            // reload tabel
            await loadOrders();

            // reset form
            document.getElementById("tanggal").value = "";
            document.getElementById("namaPart").value = "";
            document.getElementById("jumlah").value = "";
        } else {
            alert("Gagal menyimpan order. Pastikan sudah login.");
        }
    } catch (err) {
        console.error("ADD ORDER ERROR:", err);
        alert("Terjadi kesalahan saat menambahkan order");
    }
}

// ================= CHECK AUTH ON LOAD =================
(async function () {
    try {
        const res = await fetch("/api/auth", {
            method: "GET",
            credentials: "same-origin",
        });
        const data = await res.json();

        if (data.loggedIn) {
            authButton.innerText = "Logout";
            authButton.onclick = logout;
            await loadOrders();
        }
    } catch (err) {
        console.error("AUTH CHECK ERROR:", err);
    }
})();
