// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); // Jangan lupa import fs
const app = express();

const allowedOrigins = [
  "https://spmb.smktibazma.sch.id",
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

// Pastikan folder uploads exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Folder uploads dibuat");
}

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pendaftaran", require("./routes/pendaftaranRoutes"));

// ✅ STATIC UPLOADS - VERSION 1 (RECOMMENDED)
// Middleware untuk logging static files
app.use("/uploads", (req, res, next) => {
  const filePath = path.join(__dirname, "uploads", req.path);
  console.log('📁 Request file:', req.path);
  console.log('📍 Full path:', filePath);
  console.log('✅ File exists:', fs.existsSync(filePath));
  next();
});

// Static files configuration
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  fallthrough: false,
  index: false,
  dotfiles: 'deny'
}));

// ✅ ATAU VERSION 2 (LEBIH SIMPLE)
// Hapus yang di atas dan gunakan yang ini saja:
/*
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
*/

// ✅ HANDLE FILE NOT FOUND
app.use("/uploads", (req, res) => {
  console.log('❌ File tidak ditemukan:', req.path);
  res.status(404).json({
    error: "File tidak ditemukan",
    message: `File ${req.path} tidak ada di server`,
    path: req.path
  });
});

// ✅ ROUTE KHUSUS UNTUK CEK FILE
app.get("/check-file/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    res.json({
      exists: true,
      filename: filename,
      path: filePath,
      size: stats.size,
      created: stats.birthtime
    });
  } else {
    // List files yang ada di uploads
    const files = fs.readdirSync(uploadsDir);
    res.status(404).json({
      exists: false,
      filename: filename,
      searchedPath: filePath,
      availableFiles: files
    });
  }
});

// Route lainnya
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