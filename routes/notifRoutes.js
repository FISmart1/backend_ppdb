const express = require("express");
const router = express.Router();
const notif = require("../controllers/notif")

router.post("/", notif.postNotifikasi)
router.delete("/:user_id", notif.deleteNotifikasi)
router.get("/user/:user_id", notif.getNotifikasiByUser)