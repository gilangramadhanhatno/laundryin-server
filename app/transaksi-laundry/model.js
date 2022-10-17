const mongoose = require("mongoose");

let transaksiLaundrySchema = mongoose.Schema(
  {
    pelanggan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pelanggan",
      // required: [true, "Nama pelanggan harus diisi"],
    },
    paket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paket",
      // required: [true, "Paket harus diisi"],
    },
    jumlahKiloan: {
      type: Number,
      default: 0,
      required: [true, "Jumlah kiloan harus diisi"],
    },
    tanggalAmbil: {
      type: String,
      required: [true, "Tanggal ambil laundry harus diisi"],
    },
    tanggalAntar: {
      type: String,
      // required: [true, "Tanggal antar laundry harus diisi"],
    },
    statusPembayaran: {
      type: String,
      enum: ["belum bayar", "cash", "transfer"],
      default: "belum bayar",
    },
    statusCuci: {
      type: String,
      enum: ["belum dicuci", "dicuci", "selesai"],
      default: "belum dicuci",
    },
    thumbnail: {
      type: String,
      required: [true, "Gambar pakaian(kiloan) harus diisi"],
    },
    catatan: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaksi-Laundry", transaksiLaundrySchema);
