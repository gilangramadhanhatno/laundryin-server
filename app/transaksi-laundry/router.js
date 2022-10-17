var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete, viewDetail, actionCuci, actionSelesaiCuci } = require("./controller");
const multer = require("multer");
const os = require("os");

/* GET home page. */
router.get("/", index);
router.get("/tambah", viewCreate);
router.post("/tambah", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
router.get("/ubah/:id", viewEdit);
router.put("/ubah/:id", multer({ dest: os.tmpdir() }).single("image"), actionEdit);
router.delete("/hapus/:id", actionDelete);
router.get("/detail/:id", viewDetail);
router.put("/status-cuci/:id/dicuci", actionCuci);
router.put("/status-cuci/:id/selesai", actionSelesaiCuci);

module.exports = router;
