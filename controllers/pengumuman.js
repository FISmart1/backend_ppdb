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

  // 1. Cek apakah user_id sudah ada
  db.query(
    "SELECT * FROM pengumuman_seleksi WHERE user_id = ?",
    [user_id],
    (err, rows) => {
      if (err) {
        console.error("❌ ERROR SQL (SELECT):", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (rows.length === 0) {
        // 2. Kalau belum ada → INSERT
        const insertData = { user_id, ...data };
        console.log("🟢 Belum ada data → INSERT:", insertData);

        db.query(
          "INSERT INTO pengumuman_seleksi SET ?",
          insertData,
          (err, result) => {
            if (err) {
              console.error("❌ ERROR SQL (INSERT):", err);
              return res.status(500).json({ message: "Insert gagal" });
            }
            console.log("✔️ INSERT RESULT:", result);
            return res.json({ message: "Berhasil ditambahkan" });
          }
        );
      } else {
        // 3. Kalau sudah ada → UPDATE
        console.log("🟡 Data ditemukan → UPDATE...");

        db.query(
          "UPDATE pengumuman_seleksi SET ? WHERE user_id = ?",
          [data, user_id],
          (err, result) => {
            if (err) {
              console.error("❌ ERROR SQL (UPDATE):", err);
              return res.status(500).json({ message: "Update gagal" });
            }
            console.log("✔️ UPDATE RESULT:", result);
            res.json({ message: "Berhasil diperbarui" });
          }
        );
      }
    }
  );
};

