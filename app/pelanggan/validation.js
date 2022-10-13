const { body, validationResult } = require("express-validator");

const resultErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array();
    return message;
  }
};

const validationPelanggan = () => {
  return [
    body("name").not().isEmpty().withMessage("Nama harus diisi"),
    body("jenisKelamin").not().isEmpty().withMessage("Jenis kelamin harus diisi"),
    body("tel")
      .not().isEmpty()
      .withMessage("Nomor telepon harus diisi")
      .isLength({ min: 8 })
      .withMessage("Nomor telepon harus minimal 8 digit")
      .isMobilePhone()
      .withMessage("Nomor telepon tidak valid")
      .isAlpha()
      .notEmpty()
      .withMessage("Pelanggan/Nomor telepon sudah terdaftar"),
    body("address").not().isEmpty().withMessage("Alamat harus diisi"),
  ];
};

module.exports = { validationPelanggan, resultErrors };
