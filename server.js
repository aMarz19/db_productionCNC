// ================= server.js =================
const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();

// ================= CONFIG =================
const PORT = process.env.PORT || 3000;

const TELEGRAM_TOKEN = "8412680337:AAF0nBJ3LVbb1ib74MmuIG3rHEdd23XJCpk"; // ganti dengan token valid
const TELEGRAM_CHAT_ID = "7335465924"; // ganti dengan chat id valid

// ================= MIDDLEWARE =================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "sparepart_secret",
        resave: false,
        saveUninitialized: false, // jangan true
        cookie: { secure: false }, // kalau pakai https, ubah jadi true
    })
);

app.use(express.static(path.join(__dirname, "public")));

// ================= MYSQL =================
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // isi sesuai password mysql
    database: "sparepart_db",
});

// ================= TELEGRAM FUNCTION =================
async function sendTelegram(text) {
    console.log("MENGIRIM TELEGRAM...");
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
            {
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
            }
        );
        console.log("TELEGRAM RESPONSE:", response.data);
    } catch (err) {
        console.log("TELEGRAM ERROR:", err.response?.data || err.message);
    }
}

// ================= LOGIN =================
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) {
                console.error("MYSQL LOGIN ERROR:", err);
                return res.status(500).json({ success: false });
            }

            if (results.length > 0) {
                req.session.loggedIn = true;
                req.session.user = username;
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        }
    );
});

// ================= LOGOUT =================
app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// ================= AUTH CHECK =================
app.get("/api/auth", (req, res) => {
    console.log("SESSION AUTH:", req.session);
    res.json({ loggedIn: !!req.session.loggedIn });
});

// ================= GET ORDERS =================
app.get("/api/orders", (req, res) => {
    db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json([]);
        }
        res.json(result);
    });
});

// ================= INSERT ORDER =================
app.post("/api/orders", (req, res) => {
    if (!req.session.loggedIn) {
        console.log("INSERT DITOLAK: BELUM LOGIN");
        return res.status(401).json({ success: false });
    }

    const { tanggal, namaPart, jumlah } = req.body;

    console.log("DATA DITERIMA:", req.body);

    const sql = "INSERT INTO orders (tanggal, nama_part, jumlah) VALUES (?, ?, ?)";

    db.query(sql, [tanggal, namaPart, jumlah], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({ success: false });
        }

        console.log("INSERT BERHASIL ID:", result.insertId);

        const message = `
📦 ORDER BARU MASUK

ID       : ${result.insertId}
Tanggal  : ${tanggal}
Part     : ${namaPart}
Jumlah   : ${jumlah}
`;

        // Kirim Telegram tanpa await
        sendTelegram(message);

        res.json({ success: true });
    });
});

// ================= MARK ORDER AS DONE =================
// MARK ORDER AS DONE / UNCHECKED
app.post("/api/orders/done", (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false });
    }

    const { id, done } = req.body; // id order + status 0/1

    db.query(
        "UPDATE orders SET done = ? WHERE id = ?",
        [done ? 1 : 0, id],
        (err, result) => {
            if (err) {
                console.log("MYSQL UPDATE ERROR:", err);
                return res.status(500).json({ success: false });
            }
            res.json({ success: true });
        }
    );
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log("SERVER FILE YANG AKTIF");
    console.log(`Server running on http://localhost:${PORT}`);
});