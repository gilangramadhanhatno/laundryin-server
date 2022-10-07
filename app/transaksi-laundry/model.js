const mongoose = require("mongoose");

let transaksiLaundrySchema = mongoose.Schema({
  pelanggan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pelanggan",
  },
  paket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paket",
  },
  jumlahKiloan: {
    type: Number,
    default: 0,
  },
  tanggalTerima: {
    type: String,
    require: [true, "Tanggal terima laundry harus diisi"],
  },
  status: {
    type: String,
    enum: ["Sedang Diproses", "Belum Bayar", "Sudah Bayar"],
    default: "Sedang Diproses",
  },
  thumbnail: {
    type: String,
  },
  catatan: {
    type: String,
  },
});

module.exports = mongoose.model("Transaksi-Laundry", transaksiLaundrySchema);
