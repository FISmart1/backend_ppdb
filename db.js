// db.js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "adminppdb",
  password: "spmb2026",
  database: "ppdb",
  SMTP_HOST:live.smtp.mailtrap.io,
  SMTP_PORT:587,
  SMTP_USER:"smtp@mailtrap.io",
  SMTP_PASS:"a048d0bc8605b5667d1a1f95e036d491",
  SMTP_FROM:"no-reply@smktibazma.sch.id",
  MAILTRAP_API_TOKEN:"a048d0bc8605b5667d1a1f95e036d491",
  MAILTRAP_TEMPLATE_UUID:"372d405b-3abc-4d34-88a8-f0659f3949cd"
});

module.exports = db;
