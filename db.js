// db.js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "adminppdb",
  password: "spmb2026",
  database: "ppdb"
});

module.exports = db;
