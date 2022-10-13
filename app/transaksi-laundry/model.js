const mongoose = require("mongoose");

let transaksiLaundrySchema = mongoose.Schema({
  pelanggan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pelanggan",
    required: [true, "Nama pelanggan harus diisi"],
  },
  paket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paket",
    required: [true, "Paket harus diisi"],
  },
  jumlahKiloan: {
    type: Number,
    default: 0,
    required: [true, "Jumlah kiloan harus diisi"],
  },
  tanggalTerima: {
    type: String,
    required: [true, "Tanggal terima laundry harus diisi"],
  },
  status: {
    type: String,
    enum: ["Sedang Diproses", "Belum Bayar", "Sudah Bayar"],
    default: "Sedang Diproses",
  },
  thumbnail: {
    type: String,
    required: [true, "Gambar pakaian(kiloan) harus diisi"],
  },
  catatan: {
    type: String,
  },
});

module.exports = mongoose.model("Transaksi-Laundry", transaksiLaundrySchema);
