const mongoose = require("mongoose");

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
    minLength: [8, "Nomor telepon terlalu sedikit"],
    maxLength: [13, "Maksimal nomor telepon hanya sampai 13 karakter"],
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
}, "Nomor telepon sudah terdaftar!");

module.exports = mongoose.model("Pelanggan", pelangganSchema);
