const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/pendaftaranController");
const update = require("../controllers/updatePendaftaran");
const { authPlugins } = require("mysql2");

router.post("/form-pribadi", controller.simpanFormPribadi);
router.post("/form-prestasi", controller.simpanFormPrestasi);
router.post("/form-orangtua", controller.simpanFormOrangTua);
router.post(
  "/form-berkas",
  upload.fields([
    { name: "rapor", maxCount: 1 },
    { name: "sktm", maxCount: 1 },
    { name: "ss_ig", maxCount: 1 },
    { name: "kk", maxCount: 1 },
    { name: "foto", maxCount: 1 },
    { name: "kip", maxCount: 1 },
    { name: "bpjs", maxCount: 1 },
    { name: "rekomendasi_surat", maxCount: 1 },
    { name: "tagihan_listrik", maxCount: 1 },
    { name: "reels", maxCount: 1 },

    // Foto rumah
    { name: "rumah_depan", maxCount: 1 },
    { name: "rumah_ruangtamu", maxCount: 1 },
    { name: "rumah_kamar", maxCount: 1 },
  ]),
  controller.simpanFormBerkas
);
router.post("/form-rumah", controller.simpanFormRumah);
router.post("/form-kesehatan", controller.simpanFormKesehatan);
router.post("/form-aturan", controller.simpanFormAturan);

router.get("/form-pribadi/:user_id", controller.getFormPribadi);
router.get("/form-prestasi/:user_id", controller.getFormPrestasi);
router.get("/form-orangtua/:user_id", controller.getFormOrangTua);
router.get("/form-berkas/:user_id", controller.getFormBerkas);
router.get("/form-rumah/:user_id", controller.getFormRumah);
router.get("/form-kesehatan/:user_id", controller.getFormKesehatan);
router.get("/form-aturan/:user_id", controller.getFormAturan);
router.get("/user/:id/full", controller.getFullPendaftaranUser);
router.get("/user/:id/is-complete", controller.getComplete);
router.get("/user/full", controller.getFullPendaftaranAll);

router.put("/form-pribadi/:user_id", update.updateFormPribadi)
router.put("/form-prestasi/:user_id", update.updateFormPrestasi)
router.put("/form-orangtua/:user_id", update.updateFormOrangtua)
router.put("/form-rumah/:user_id", update.updateFormRumah)
router.put("/form-kesehatan/:user_id", update.updateFormKesehatan)
router.put(
  "/form-berkas/:user_id",
  upload.fields([
    { name: "rapor" },
    { name: "sktm" },
    { name: "ss_ig" },
    { name: "kk" },
    { name: "foto" },
    { name: "kip" },
    { name: "bpjs" },
    { name: "rekomendasi_surat" },
    { name: "tagihan_listrik" },
    { name: "reels" },
    { name: "rumah_depan" },
    { name: "rumah_ruangtamu" },
    { name: "rumah_kamar" },
  ]),
  update.updateFormBerkas
);

router.put("/form-aturan/:user_id", update.updateFormAturan)
router.patch("/validasi", update.updateValidasiPendaftaran)

module.exports = router;
