const mongoose = require("mongoose");

let paketSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama paket harus diisi"],
  },
  waktuKerja: {
    type: String,
    required: [true, "Waktu kerja harus diisi"],
  },
  harga: {
    type: String,
    required: [true, "Harga harus diisi"],
  },
  //   beratMinimal: {
  //     // minimal 2 kg
  //     type: String,
  //     // min: [6, "No telepon terlalu sedikit"],
  //     // max: 12,
  //     required: [true, "Berat minimal harus diisi"],
  //   },
  //   jenisBiaya: {
  //     // per kilo / satuan
  //     type: String,
  //     required: [true, "Jenis biaya harus diisi"],
  //   },
});

module.exports = mongoose.model("Paket", paketSchema);
