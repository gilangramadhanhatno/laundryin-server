const mongoose = require("mongoose");

let paketSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama paket harus diisi"],
  },
  waktuKerja: {
    type: String,
    require: [true, "Waktu kerja harus diisi"],
  },
  harga: {
    type: String,
    require: [true, "Harga harus diisi"],
  },
  //   beratMinimal: {
  //     // minimal 2 kg
  //     type: String,
  //     // min: [6, "No telepon terlalu sedikit"],
  //     // max: 12,
  //     require: [true, "Berat minimal harus diisi"],
  //   },
  //   jenisBiaya: {
  //     // per kilo / satuan
  //     type: String,
  //     require: [true, "Jenis biaya harus diisi"],
  //   },
});

module.exports = mongoose.model("Paket", paketSchema);
