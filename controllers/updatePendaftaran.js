const db = require("../db");

exports.updateFormPribadi = (req, res) => {
  const user_id = req.params.user_id;

  const fields = { ...req.body };

  // Hapus field yang TIDAK BOLEH di-update

  delete fields.user_id;
  delete fields.created_at;

  const sql = `
    UPDATE form_pribadi SET ?
    WHERE user_id = ?
  `;

  db.query(sql, [fields, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update data!" });
    }

    res.json({ message: "Data berhasil diperbarui!" });
  });
};

exports.updateFormPrestasi = async (req, res) => {
  try {
    const {
      user_id,
      math,
      indo,
      english,
      ipa,
      pai,
      foreignLanguage,
      hafalan,
      achievement,
      organization,
      dream,
      hobby,
      special,
    } = req.body;

    const sql = `
      UPDATE form_prestasi SET
        math_s3 = ?, math_s4 = ?, math_s5 = ?,
        indo_s3 = ?, indo_s4 = ?, indo_s5 = ?,
        english_s3 = ?, english_s4 = ?, english_s5 = ?,
        ipa_s3 = ?, ipa_s4 = ?, ipa_s5 = ?,
        pai_s3 = ?, pai_s4 = ?, pai_s5 = ?,
        foreignLanguage = ?, hafalan = ?, achievement = ?, organization = ?, dream = ?, hobby = ?, special = ?
      WHERE user_id = ?
    `;

    const values = [
      math.s3, math.s4, math.s5,
      indo.s3, indo.s4, indo.s5,
      english.s3, english.s4, english.s5,
      ipa.s3, ipa.s4, ipa.s5,
      pai.s3, pai.s4, pai.s5,
      foreignLanguage, hafalan, achievement, organization, dream, hobby, special,
      user_id
    ];

    const [result] = await db.promise().query(sql, values);

    res.json({
      status: true,
      message: "Data prestasi berhasil diupdate!",
      result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error", error });
  }
};

exports.updateFormOrangtua = (req, res) => {
  const user_id = req.params.user_id;

  const fields = { ...req.body };

  // HAPUS FIELD YANG TIDAK BOLEH DI-UPDATE
  delete fields.user_id;
  delete fields.message;
  delete fields.created_at;

  const sql = `
    UPDATE form_orangtua SET ?
    WHERE user_id = ?
  `;

  db.query(sql, [fields, user_id], (err, result) => {
    if (err) {
      console.error("UPDATE ORANGTUA ERROR:", err);
      return res.status(500).json({ message: "Gagal update data!" });
    }

    res.json({ message: "Data orang tua berhasil diperbarui!" });
  });
};

exports.updateFormRumah = (req, res) => {
  const user_id = req.params.user_id;

  const fields = { ...req.body };

  // Field tidak boleh di-update
  delete fields.user_id;
  delete fields.created_at;

  const sql = `
    UPDATE form_rumah SET ?
    WHERE user_id = ?
  `;

  db.query(sql, [fields, user_id], (err, result) => {
    if (err) {
      console.error("UPDATE RUMAH ERROR:", err);
      return res.status(500).json({ message: "Gagal update data rumah!" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data rumah tidak ditemukan!" });
    }

    res.json({ message: "Data rumah berhasil diperbarui!" });
  });
};

exports.updateFormKesehatan = (req, res) => {
  const user_id = req.params.user_id;

  const fields = { ...req.body };

  // Hapus field yang tidak boleh di-update
  delete fields.user_id;
  delete fields.created_at;

  const sql = `
    UPDATE form_kesehatan SET ?
    WHERE user_id = ?
  `;

  db.query(sql, [fields, user_id], (err, result) => {
    if (err) {
      console.error("UPDATE KESEHATAN ERROR:", err);
      return res.status(500).json({ message: "Gagal update data kesehatan!" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Data kesehatan tidak ditemukan!"
      });
    }

    res.json({ message: "Data kesehatan berhasil diperbarui!" });
  });
};

exports.updateFormBerkas = (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "User ID tidak ditemukan" });
  }

  // Ambil semua file yang diupload
  const uploadedFiles = req.files || {};

  // Jika tidak ada file sama sekali → tolak
  if (Object.keys(uploadedFiles).length === 0) {
    return res.status(400).json({ message: "Tidak ada file yang dikirim" });
  }

  // Siapkan fields yang akan di-update
  const updateFields = {};

  // Loop semua file hasil multer
  for (const key in uploadedFiles) {
  const cleanKey = key.replace(/\s+/g, "_"); // buang spasi
  updateFields[cleanKey] = uploadedFiles[key][0].filename;
}


  // Jika tidak ada field file valid
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "Tidak ada file valid untuk update" });
  }

  const sql = `
    UPDATE form_berkas SET ?
    WHERE user_id = ?
  `;

  db.query(sql, [updateFields, user_id], (err, result) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ message: "Gagal update berkas!" });
    }

    return res.json({
      message: "Berkas berhasil diperbarui!",
      updated: updateFields
    });
  });
};

exports.updateFormAturan = (req, res) => {
  const { user_id } = req.params;
  const { pernyataan1, pernyataan2, pernyataan3 } = req.body;

  if (!user_id) return res.status(400).json({ message: "user_id wajib dikirim!" });

  const sql = `
    UPDATE form_aturan 
    SET pernyataan1=?, pernyataan2=?, pernyataan3=?
    WHERE user_id=?
  `;

  db.query(sql, [pernyataan1, pernyataan2, pernyataan3, user_id], (err) => {
    if (err) return res.status(500).json({ message: "Gagal update pernyataan!" });

    res.json({ message: "Pernyataan berhasil diperbarui!" });
  });
};
