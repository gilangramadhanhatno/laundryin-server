const mongoose = require("mongoose");

let pelangganSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama pelanggan harus diisi"],
  },
  jenisKelamin: {
    type: String,
    require: [true, "Jenis Kelamin harus diisi"],
  },
  tel: {
    type: String,
    // min: [6, "No telepon terlalu sedikit"],
    // max: 12,
    require: [true, "Nomor telepon harus diisi"],
  },
  address: {
    type: String,
    require: [true, "Alamat harus diisi"],
  },
});

module.exports = mongoose.model("Pelanggan", pelangganSchema);
