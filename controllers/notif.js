const db = require("../db");

exports.postNotifikasi = (req, res) => {
  const { user_id, title, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ message: "users_id dan message wajib dikirim!" });
  }

  const sql = `INSERT INTO notifikasi (user_id, title, message) VALUES (?, ?, ?)`;
  const values = [user_id, title ?? null, message];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menambahkan notifikasi", error: err });

    res.status(201).json({
      message: "Notifikasi berhasil dibuat",
      id: result.insertId
    });
  });
};

exports.deleteNotifikasi = (req, res) => {
  const user_id = req.params.user_id;

  const sql = `DELETE FROM notifikasi WHERE user_id = ?`;

  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menghapus notifikasi", error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notifikasi tidak ditemukan" });
    }

    res.json({ message: "Notifikasi berhasil dihapus" });
  });
};

// GET - Ambil notifikasi berdasarkan users_id
exports.getNotifikasiByUser = (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "users_id wajib dikirim!" });
  }

  const sql = `
    SELECT *
    FROM notifikasi
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Gagal mengambil notifikasi user" });
    }

    res.json(results);
  });
};
