const express = require("express");
const router = express.Router();
const pengumuman = require("../controllers/pengumuman");
router.put("/:user_id", pengumuman.updatePengumuman)
router.get("/:user_id", pengumuman.getPengumuman)

module.exports = router;