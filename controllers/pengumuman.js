const db = require("../db");

exports.getPengumuman = (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "SELECT * FROM pengumuman_seleksi WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Gagal mengambil data" });
      res.json(results[0] || null);
    }
  );
};


exports.updatePengumuman = (req, res) => {
  const user_id = req.params.user_id;
  const data = { ...req.body };
  delete data.user_id;

  console.log("📥 Request updatePengumuman:", { user_id, data });

  db.query(
    "UPDATE pengumuman_seleksi SET ? WHERE user_id = ?",
    [data, user_id],
    (err, result) => {
      if (err) {
        console.error("❌ ERROR SQL:", err);
        return res.status(500).json({ message: "Update gagal", error: err });
      }
      console.log("✔️ SQL RESULT:", result);
      res.json({ message: "Berhasil diperbarui" });
    }
  );
};

