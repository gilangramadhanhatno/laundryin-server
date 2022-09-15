var express = require("express");
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require("./controller");

/* GET home page. */
router.get("/", index);
router.get("/tambah", viewCreate);
router.post("/tambah", actionCreate);
router.get("/ubah/:id", viewEdit);
router.put("/ubah/:id", actionEdit);
router.delete("/hapus/:id", actionDelete);

module.exports = router;
