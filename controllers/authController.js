// controllers/authController.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, email, password, no_wa } = req.body;
  console.log("NO_WA:", no_wa);

  if (!name || !email || !password|| !no_wa ) return res.status(400).json({ message: 'Semua field wajib diisi!' });

  // Cek email sudah dipakai atau belum
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error server', err });

    if (result.length > 0) return res.status(400).json({ message: 'Email sudah terdaftar!' });

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertQuery = 'INSERT INTO users (name, email, password, no_wa) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [name, email, hashedPassword, no_wa], (err2) => {
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
