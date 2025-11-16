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
// Ganti ini:
// Middleware untuk logging static files
app.use("/uploads", (req, res, next) => {
  const filePath = path.join(__dirname, "uploads", req.path);
  console.log('Request file:', req.path);
  console.log('Full path:', filePath);
  console.log('File exists:', fs.existsSync(filePath));
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Menjadi:
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  fallthrough: true,
  index: false
}));

// Tambahkan error handling
app.use("/uploads", (err, req, res, next) => {
  if (err) {
    console.log('Error accessing file:', req.path);
    return res.status(404).send('File tidak ditemukan');
  }
  next();
});

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
