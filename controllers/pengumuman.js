const db = require("../db");

exports.getAllPengumuman = (req, res) => {
  const sql = `
    SELECT 
      ps.user_id,
      fp.fullName,
      fp.nisn,
      u.name as user_name,
      ps.seleksi_berkas,
      ps.tes_akademik,
      ps.tes_psikotes,
      ps.wawancara,
      ps.tes_baca_quran,
      ps.home_visit,
      ps.pengumuman_akhir
    FROM pengumuman_seleksi ps
    LEFT JOIN users u ON ps.user_id = u.id
    LEFT JOIN form_pribadi fp ON ps.user_id = fp.user_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

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

  // Hapus field yang tidak boleh ikut di-update
  delete data.isLolos; // pastikan tidak ikut masuk ke query
  delete data.catatan;
  console.log("📥 Request updatePengumuman:", { user_id, data });


  // 1️⃣ Cek apakah data sudah ada
  db.query(
    "SELECT * FROM pengumuman_seleksi WHERE user_id = ?",
    [user_id],
    (err, rows) => {
      if (err) {
        console.error("❌ ERROR SQL (SELECT):", err);
        return res.status(500).json({ message: "Database error (SELECT)" });
      }

      console.log("🔍 Hasil SELECT :", rows);

      if (rows.length === 0) {
        // 2️⃣ Belum ada → INSERT
        const insertData = { user_id, ...data };
        console.log("🟢 Tidak ada data sebelumnya → INSERT:", insertData);

        db.query(
          "INSERT INTO pengumuman_seleksi SET ?",
          insertData,
          (err, result) => {
            if (err) {
              console.error("❌ ERROR SQL (INSERT):", err);
              return res.status(500).json({ message: "Insert gagal" });
            }
            console.log("✔️ INSERT RESULT:", result);
            return res.json({
              message: "Berhasil ditambahkan",
              action: "insert",
              data: insertData,
            });
          }
        );
      } else {
        // 3️⃣ Sudah ada → UPDATE
        console.log("🟡 Data sudah ada → UPDATE dengan:", data);

        db.query(
          "UPDATE pengumuman_seleksi SET ? WHERE user_id = ?",
          [data, user_id],
          (err, result) => {
            if (err) {
              console.error("❌ ERROR SQL (UPDATE):", err);
              return res.status(500).json({ message: "Update gagal" });
            }

            if (result.affectedRows === 0) {
              console.warn("⚠️ UPDATE tidak mengubah apapun (affectedRows 0)");
              return res.status(400).json({
                message: "Data tidak berubah atau tidak ditemukan",
              });
            }

            console.log("✔️ UPDATE RESULT:", result);
            res.json({
              message: "Berhasil diperbarui",
              action: "update",
              data,
            });
          }
        );
      }
    }
  );
};
