const mongoose = require("mongoose");
const assert = require("assert");

let pelangganSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama pelanggan harus diisi"],
  },
  jenisKelamin: {
    type: String,
    required: [true, "Jenis Kelamin harus diisi"],
  },
  tel: {
    type: String,
    required: [true, "Nomor telepon harus diisi"],
    min: [8, "Nomor telepon terlalu sedikit"],
    max: 13,
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Alamat harus diisi"],
  },
});

pelangganSchema.path("tel").validate(async (tel) => {
  const telCount = await mongoose.models.Pelanggan.countDocuments({ tel });
  return !telCount;
}, "Nomor telepon sudah terdaftar");

const Pelanggan = mongoose.model("Pelanggan", pelangganSchema);

// const pelanggan = new Pelanggan({
//   tel: 2,
// });
// const error = pelanggan.validateSync();
// assert.equal(error.errors["tel"].message, "Nomor telepon terlalu sedikit");

module.exports = Pelanggan;
