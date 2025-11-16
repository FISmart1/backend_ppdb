// server.js
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://spmb-new.smktibazma.sch.id",
  "https://backend_spmb.smktibazma.sch.id",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pendaftaran", require("./routes/pendaftaranRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/pengumuman", require("./routes/pengumumanRoutes"))
app.use("/notifikasi", require("./routes/notifRoutes"))

app.get("/", (req, res) => {
  res.send("API berjalan...");
});

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server berjalan di http://${HOST}:${PORT}`);
});

