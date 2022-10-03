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
  // total: {
  //   type: Number,
  //   require: [true, "Total harga harus diisi"],
  // },
  tanggalTerima: {
    type: String,
    require: [true, "Tanggal terima laundry harus diisi"],
  },
  status: {
    type: String,
    enum: ["Belum Bayar", "Sudah Bayar"],
    default: "Belum Bayar",
  },
  thumbnail: {
    type: String,
  },
  catatan: {
    type: String,
  },
});

module.exports = mongoose.model("Transaksi-Laundry", transaksiLaundrySchema);
