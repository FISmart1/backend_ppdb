// server.js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pendaftaran", require("./routes/pendaftaranRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/pengumuman", require("./routes/pengumumanRoutes"))

app.get("/", (req, res) => {
  res.send("API berjalan...");
});

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server berjalan di http://${HOST}:${PORT}`);
});

