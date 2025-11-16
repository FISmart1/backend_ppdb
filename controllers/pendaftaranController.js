const db = require("../db");

exports.simpanFormPribadi = (req, res) => {
  const {
    user_id,
    fullName,
    nisn,
    nik,
    birthPlace,
    birthDate,
    province,
    city,
    district,
    village,
    addressDetail,
    rt,
    rw,
    postalCode,
    schoolOrigin,
    graduationYear,
    npsn,
    childOrder,
    parentStatus,
    familyStatus,
    socialAid,
    livingWith,
    livingWithCustom,
    phone,
    socialMedia
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id wajib dikirim!" });
  }

  const sql = `
    INSERT INTO form_pribadi (
      user_id, fullName, nisn, nik, birthPlace, birthDate,
      province, city, district, village, addressDetail, rt, rw, postalCode,
      schoolOrigin, graduationYear, npsn,
      childOrder, parentStatus, familyStatus, socialAid, livingWith, livingWithCustom,
      phone, socialMedia
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?)
  `;

  const values = [
    user_id, fullName, nisn, nik, birthPlace, birthDate,
    province, city, district, village, addressDetail, rt, rw, postalCode,
    schoolOrigin, graduationYear, npsn,
    childOrder, parentStatus, familyStatus, socialAid, livingWith, livingWithCustom,
    phone, socialMedia
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menyimpan data!" });
    }

    res.json({ message: "Form pribadi berhasil disimpan!" });
  });
};

exports.simpanFormPrestasi = (req, res) => {
  const {
    user_id,
    math, indo, english, ipa, pai,
    foreignLanguage,
    hafalan,
    achievement,
    organization,
    dream,
    hobby,
    special
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id wajib dikirim!" });
  }

  const sql = `
    INSERT INTO form_prestasi (
      user_id,
      math_s3, math_s4, math_s5,
      indo_s3, indo_s4, indo_s5,
      english_s3, english_s4, english_s5,
      ipa_s3, ipa_s4, ipa_s5,
      pai_s3, pai_s4, pai_s5,
      foreignLanguage, hafalan,
      achievement, organization,
      dream, hobby, special
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,

    math.s3, math.s4, math.s5,
    indo.s3, indo.s4, indo.s5,
    english.s3, english.s4, english.s5,
    ipa.s3, ipa.s4, ipa.s5,
    pai.s3, pai.s4, pai.s5,

    foreignLanguage,
    hafalan,
    achievement,
    organization,
    dream,
    hobby,
    special
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menyimpan data prestasi!" });
    }

    res.json({ message: "Form prestasi berhasil disimpan!" });
  });
};

exports.simpanFormOrangTua = (req, res) => {
  const {
    user_id,

    ayah_nama,
    ayah_alamat,
    ayahTelepon,
    ayah_pekerjaan,
    ayah_tanggungan,
    ayah_penghasilan,

    ibu_nama,
    ibu_alamat,
    ibu_telepon,
    ibu_pekerjaan,
    ibu_tanggungan,
    ibu_penghasilan,

    wali_nama,
    wali_hubungan,
    wali_tanggungan,
    wali_pekerjaan,
    wali_alamat,
    wali_sumber,
    wali_penghasilan,

    info_ppdb,
    saudara_beasiswa,
  } = req.body;

  const sql = `
    INSERT INTO form_orangtua (
      user_id,
      ayah_nama, ayah_alamat, ayah_telepon, ayah_pekerjaan, ayah_tanggungan, ayah_penghasilan,
      ibu_nama, ibu_alamat, ibu_telepon, ibu_pekerjaan, ibu_tanggungan, ibu_penghasilan,
      wali_nama, wali_hubungan, wali_tanggungan, wali_pekerjaan, wali_alamat, wali_sumber, wali_penghasilan,
      info_ppdb, saudara_beasiswa
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,

    ayah_nama,
    ayah_alamat,
    ayahTelepon,
    ayah_pekerjaan,
    ayah_tanggungan,
    ayah_penghasilan,

    ibu_nama,
    ibu_alamat,
    ibu_telepon,
    ibu_pekerjaan,
    ibu_tanggungan,
    ibu_penghasilan,

    wali_nama,
    wali_hubungan,
    wali_tanggungan,
    wali_pekerjaan,
    wali_alamat,
    wali_sumber,
    wali_penghasilan || 0,

    info_ppdb,
    saudara_beasiswa || "-",
  ];

  console.log("VALUES YANG DIKIRIM:", values); // CEK

  db.query(sql, values, (err) => {
    if (err) {
      console.error("MYSQL ERROR:", err);
      return res.status(500).json({ message: "Gagal menyimpan data!" });
    }
    return res.json({ message: "Data orang tua / wali berhasil disimpan!" });
  });
};

exports.simpanFormRumah = (req, res) => {
  const {
    user_id,
    luasTanah,
    kualitasRumah,
    statusKepemilikanRumah,
    kendaraanDimiliki,
    statusKendaraan,
    hartaTidakBergerak,
    statusHarta,
    dayaListrik,
    sumberAir,
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id wajib dikirim!" });
  }

  const sql = `
    INSERT INTO form_rumah (
      user_id, luasTanah, kualitasRumah, statusKepemilikanRumah,
      kendaraanDimiliki, statusKendaraan,
      hartaTidakBergerak, statusHarta,
      dayaListrik, sumberAir
    ) VALUES (?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    user_id,
    luasTanah,
    kualitasRumah,
    statusKepemilikanRumah,
    kendaraanDimiliki,
    statusKendaraan,
    hartaTidakBergerak,
    statusHarta,
    dayaListrik,
    sumberAir,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gagal menyimpan data!" });
    }
    res.json({ message: "Form rumah berhasil disimpan!" });
  });
};

exports.simpanFormBerkas = (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) return res.status(400).json({ message: "user_id wajib dikirim!" });

  const f = req.files;

  const sql = `
    INSERT INTO form_berkas (
      user_id, rapor, sktm, ss_ig, kk, foto, kip, bpjs,
      rekomendasi_surat, tagihan_listrik, reels,
      rumah_depan, rumah_ruangtamu, rumah_kamar
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    f.rapor?.[0]?.filename || null,
    f.sktm?.[0]?.filename || null,
    f.ss_ig?.[0]?.filename || null,
    f.kk?.[0]?.filename || null,
    f.foto?.[0]?.filename || null,
    f.kip?.[0]?.filename || null,
    f.bpjs?.[0]?.filename || null,
    f.rekomendasi_surat?.[0]?.filename || null,
    f.tagihan_listrik?.[0]?.filename || null,
    f.reels?.[0]?.filename || null,

    f.depan?.[0]?.filename || null,
    f.ruangtamu?.[0]?.filename || null,
    f.kamar?.[0]?.filename || null,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({ message: "Gagal menyimpan berkas!" });
    }

    return res.json({ message: "Berkas berhasil diupload!" });
  });
};

exports.simpanFormKesehatan = (req, res) => {
  const {
    user_id,
    tinggiBadan,
    beratBadan,
    penyakitMenular,
    penyakitNonMenular,
    golonganDarah,
    kesehatanMental,
    butaWarna,
    perokok
  } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ message: "user_id wajib dikirim!" });
  }

  const sql = `
    INSERT INTO form_kesehatan (
      user_id, tinggiBadan, beratBadan,
      penyakitMenular, penyakitNonMenular,
      golonganDarah, kesehatanMental,
      butaWarna, perokok
    ) VALUES (?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    user_id,
    tinggiBadan,
    beratBadan,
    penyakitMenular,
    penyakitNonMenular,
    golonganDarah,
    kesehatanMental,
    butaWarna,
    perokok
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);

      // Jika user sudah punya data
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "Data kesehatan untuk user ini sudah ada!"
        });
      }

      return res
        .status(500)
        .json({ message: "Gagal menyimpan data!" });
    }

    res.json({
      message: "Form kesehatan berhasil disimpan!"
    });
  });
};

exports.simpanFormAturan = (req, res) => {
  const { user_id, pernyataan1, pernyataan2, pernyataan3 } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id wajib dikirim!" });
  }

  // Semua harus YA
  if (pernyataan1 !== "ya" || pernyataan2 !== "ya" || pernyataan3 !== "ya") {
    return res.status(400).json({
      message: "Semua pernyataan harus dijawab 'ya' untuk melanjutkan."
    });
  }

  const sql = `
    INSERT INTO form_aturan (
      user_id, pernyataan1, pernyataan2, pernyataan3
    ) VALUES (?, ?, ?, ?)
  `;

  const values = [user_id, pernyataan1, pernyataan2, pernyataan3];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "Form aturan sudah pernah diisi oleh user ini!"
        });
      }

      return res.status(500).json({ message: "Gagal menyimpan data!" });
    }

    res.json({ message: "Form aturan berhasil disimpan!" });
  });
};


//get semua disini
exports.getFormPribadi = (req, res) => {
  const { user_id } = req.params;

  const sql = "SELECT * FROM form_pribadi WHERE user_id = ? LIMIT 1";

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data form pribadi!" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data form pribadi belum diisi." });
    }

    res.json(results[0]);
  });
};

exports.getFormPrestasi = (req, res) => {
  const { user_id } = req.params;

  const sql = "SELECT * FROM form_prestasi WHERE user_id = ? LIMIT 1";

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data form prestasi!" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data form prestasi belum diisi." });
    }

    res.json(results[0]);
  });
};

exports.getFormOrangTua = (req, res) => {
  const { user_id } = req.params;

  const sql = "SELECT * FROM form_orangtua WHERE user_id = ? LIMIT 1";

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data!", error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: "Data form orang tua belum diisi." });
    }

    return res.json(results[0]);
  });
};

exports.getFormBerkas = (req, res) => {
  const { user_id } = req.params;

  const sql = "SELECT * FROM form_berkas WHERE user_id = ? LIMIT 1";

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data!" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Data berkas belum diupload." });
    }

    res.json(results[0]);
  });
};

exports.getFormRumah = (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT * FROM form_rumah WHERE user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Gagal mengambil data!" });
      }

      res.json(results[0] || {});
    }
  );
};

exports.getFormKesehatan = (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT * FROM form_kesehatan WHERE user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Gagal mengambil data!" });
      }

      res.json(results[0] || {});
    }
  );
};

exports.getFormAturan = (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT * FROM form_aturan WHERE user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal mengambil data!" });
      }

      res.json(results[0] || {});
    }
  );
};

exports.getFullPendaftaranUser = (req, res) => {
  const { id } = req.params;

  const data = {};

  // SQL tabel-tabelnya
  const queries = {
    user: "SELECT * FROM users WHERE id = ?",
    bio: "SELECT * FROM form_pribadi WHERE user_id = ?",
    orangtua: "SELECT * FROM form_orangtua WHERE user_id = ?",
    pres: "SELECT * FROM form_prestasi WHERE user_id = ?",
    rumah: "SELECT * FROM form_rumah WHERE user_id = ?",
    kesehatan: "SELECT * FROM form_kesehatan WHERE user_id = ?",
    berkas: "SELECT * FROM form_berkas WHERE user_id = ?",
    aturan: "SELECT * FROM form_aturan WHERE user_id = ?",
  };

  let completed = 0;
  const total = Object.keys(queries).length;

  Object.keys(queries).forEach((key) => {
    db.query(queries[key], [id], (err, results) => {
      if (err) {
        console.log("MYSQL ERROR:", err);
        return res.status(500).json({
          message: "Gagal mengambil data pendaftaran",
          error: err,
        });
      }

      data[key] = results.length > 0 ? results[0] : null;

      completed++;

      if (completed === total) {
        res.json(data); // semua data terkumpul
      }
    });
  });

  
};

exports.getComplete = async (req, res) => {
  try {
    const user_id = req.params.id;

    const [rows] = await db
      .promise()
      .query(
        `
        SELECT
          (SELECT COUNT(*) FROM form_pribadi WHERE user_id = ?) AS biodata_ok,
          (SELECT COUNT(*) FROM form_rumah WHERE user_id = ?) AS alamat_ok,
          (SELECT COUNT(*) FROM form_orangtua WHERE user_id = ?) AS orangtua_ok,
          (SELECT COUNT(*) FROM form_prestasi WHERE user_id = ?) AS prestasi_ok,
          (SELECT COUNT(*) FROM form_kesehatan WHERE user_id = ?) AS kesehatan_ok,
          (SELECT COUNT(*) FROM form_berkas WHERE user_id = ?) AS berkas_ok
        `,
        [user_id, user_id, user_id, user_id, user_id, user_id]
      );

    const data = rows[0];

    const isComplete =
      data.biodata_ok > 0 &&
      data.alamat_ok > 0 &&
      data.orangtua_ok > 0 &&
      data.prestasi_ok > 0 &&
      data.kesehatan_ok > 0 &&
      data.berkas_ok > 0 

    res.json({
      status: true,
      isComplete,
      detail: data,
    });
  } catch (err) {
    console.error("ERROR getComplete:", err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

exports.getPengumuman = (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "SELECT * FROM pengumuman_seleksi WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Gagal mengambil data" });

      res.json(results[0] || {});
    }
  );
};

exports.updatePengumuman = (req, res) => {
  const user_id = req.params.user_id;
  const fields = { ...req.body };
  delete fields.user_id;

  db.query(
    "UPDATE pengumuman_seleksi SET ? WHERE user_id = ?",
    [fields, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update gagal!" });
      return res.json({ message: "Update sukses!" });
    }
  );
};

exports.getFullPendaftaranAll = (req, res) => {
  const queryUsers = "SELECT * FROM users";

  db.query(queryUsers, (err, users) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil users", err });
    }

    // Jika tidak ada user
    if (users.length === 0) {
      return res.json({ message: "Tidak ada user", data: [] });
    }

    let finalData = [];
    let completedUsers = 0;

    users.forEach((user) => {
      const userId = user.id;
      const dataUser = { user };

      const queries = {
        bio: "SELECT * FROM form_pribadi WHERE user_id = ?",
        orangtua: "SELECT * FROM form_orangtua WHERE user_id = ?",
        pres: "SELECT * FROM form_prestasi WHERE user_id = ?",
        rumah: "SELECT * FROM form_rumah WHERE user_id = ?",
        kesehatan: "SELECT * FROM form_kesehatan WHERE user_id = ?",
        berkas: "SELECT * FROM form_berkas WHERE user_id = ?",
        aturan: "SELECT * FROM form_aturan WHERE user_id = ?",
      };

      let done = 0;
      const total = Object.keys(queries).length;

      Object.keys(queries).forEach((key) => {
        db.query(queries[key], [userId], (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Gagal mengambil data", err });
          }

          dataUser[key] = result.length ? result[0] : null;

          done++;

          // ketika semua form selesai diambil
          if (done === total) {
            finalData.push(dataUser);
            completedUsers++;

            // ketika semua user selesai diambil
            if (completedUsers === users.length) {
              return res.json({
                message: "Berhasil mengambil semua pendaftaran",
                data: finalData,
              });
            }
          }
        });
      });
    });
  });
};
