// controllers/authController.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, email, password, wa } = req.body;
  console.log("NO_WA:", wa);

  if (!name || !email || !password || !wa ) return res.status(400).json({ message: 'Semua field wajib diisi!' });

  // Cek email sudah dipakai atau belum
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error server', err });

    if (result.length > 0) return res.status(400).json({ message: 'Email sudah terdaftar!' });

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertQuery = 'INSERT INTO users (name, email, password, wa) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [name, email, hashedPassword, wa], (err2) => {
      if (err2) return res.status(500).json({ message: 'Gagal mendaftar', err2 });

      return res.status(201).json({ message: 'Pendaftaran berhasil!' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email dan password wajib!' });

  const userQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(userQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', err });

    if (result.length === 0) return res.status(400).json({ message: 'Email tidak ditemukan!' });

    const user = result[0];

    // Cek password
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Password salah!' });

    // 🔥 Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, 'SECRET_KEY_JANGAN_LUPA_GANTI', { expiresIn: '7d' });

    return res.status(200).json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        validasi_pendaftaran: user.validasi_pendaftaran, // 🔥 WAJIB
      },
    });
  });
};

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email dan password wajib!' });

  const adminQuery = 'SELECT * FROM admins WHERE email = ?';
  db.query(adminQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', err });

    if (result.length === 0)
      return res.status(400).json({ message: 'Email admin tidak ditemukan!' });

    const admin = result[0];

    // ❌ Tidak pakai hash, kita cek langsung plaintext
    if (password !== admin.password)
      return res.status(400).json({ message: 'Password salah!' });

    // Generate token admin
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      'ADMIN_SECRET_KEY_GANTI_YA',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login admin berhasil!',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  });
};

const db = require('../db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const axios = require('axios');

const mailtrap = require('../config/mailtrap');

// ==============================
// 1️⃣ REQUEST RESET PASSWORD
// ==============================
exports.requestResetPassword = (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email wajib diisi' });
  }

  // 🔥 FIX PENTING
  email = email.trim().toLowerCase();

  db.query(
    'SELECT * FROM users WHERE LOWER(email) = ?',
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error', err });

      if (result.length === 0) {
        return res.status(404).json({ message: 'Email tidak ditemukan' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expired = new Date(Date.now() + 15 * 60 * 1000);

      db.query(
        'UPDATE users SET reset_token=?, reset_expired=? WHERE id=?',
        [token, expired, result[0].id]
      );

      const resetLink = `https://frontend-smktibazma.sch.id/reset-password?token=${token}`;

      try {
        await axios.post(
          'https://send.api.mailtrap.io/api/send',
          {
            template_uuid: mailtrap.templateUUID,
            template_variables: {
              reset_link: resetLink,
              email: email,
            },
            to: [{ email }],
            from: {
              email: mailtrap.fromEmail,
              name: 'SPMB SMK TI Bazma',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${mailtrap.apiToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        return res.json({
          message: 'Link reset password berhasil dikirim ke email',
        });
      } catch (e) {
        console.error('MAIL ERROR:', e.response?.data || e);
        return res.status(500).json({
          message: 'Gagal mengirim email reset password',
        });
      }
    }
  );
};
\

// ==============================
// 2️⃣ RESET PASSWORD
// ==============================
exports.resetPassword = (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  db.query(
    'SELECT id FROM users WHERE reset_token=? AND reset_token_expired > NOW()',
    [token],
    async (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error' });

      if (result.length === 0) {
        return res.status(400).json({
          message: 'Token tidak valid atau sudah kadaluarsa',
        });
      }

      const hashed = await bcrypt.hash(password, 10);

      db.query(
        'UPDATE users SET password=?, reset_token=NULL, reset_token_expired=NULL WHERE id=?',
        [hashed, result[0].id]
      );

      res.json({ message: 'Password berhasil direset' });
    }
  );
};
