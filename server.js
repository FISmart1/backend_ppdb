// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const allowedOrigins = [
  "https://spmb-new.smktibazma.sch.id",
  "https://backend_spmb.smktibazma.sch.id",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
console.log("SERVER PATH:", __dirname);
console.log("UPLOADS PATH:", path.join(__dirname, "uploads"));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pendaftaran", require("./routes/pendaftaranRoutes"));

// STATIC UPLOADS (FIXED)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/pengumuman", require("./routes/pengumumanRoutes"));
app.use("/notifikasi", require("./routes/notifRoutes"));

app.get("/", (req, res) => {
  res.send("API berjalan...");
});

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server berjalan di http://${HOST}:${PORT}`);
});
