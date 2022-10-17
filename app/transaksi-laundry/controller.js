const TransaksiLaundry = require("./model");
const Pelanggan = require("../pelanggan/model");
const Paket = require("../paket/model");

const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const transaksiLaundry = await TransaksiLaundry.find().populate("pelanggan").populate("paket");
      res.render("admin/transaksi_laundry/view_transaksi_laundry", {
        transaksiLaundry,
        alert,
        title: "Laundryin | Transaksi Laundry",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const transaksiLaundry = await TransaksiLaundry.find();
      const pelanggan = await Pelanggan.find();
      const paket = await Paket.find();

      res.render("admin/transaksi_laundry/tambah_transaksi_laundry", {
        transaksiLaundry,
        pelanggan,
        paket,
        alert,
        title: "Laundryin | Tambah Transaksi Laundry",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { pelanggan, paket, jumlahKiloan, tanggalAmbil, catatan } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const transaksiLaundry = await TransaksiLaundry({
              pelanggan,
              paket,
              jumlahKiloan,
              tanggalAmbil,
              catatan,
              thumbnail: filename,
            });

            await transaksiLaundry.save();

            req.flash("alertMessage", "Berhasil tambah transaksi laundry");
            req.flash("alertStatus", "success");
            req.flash("alertIcon", "fas fa-check");
            res.redirect("/transaksi-laundry");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            req.flash("alertIcon", "fas fa-ban");
            res.redirect("/transaksi-laundry/tambah");
          }
        });
      } else {
        const transaksiLaundry = await TransaksiLaundry({
          pelanggan,
          paket,
          jumlahKiloan,
          tanggalAmbil,
          catatan,
        });

        await transaksiLaundry.save();

        req.flash("alertMessage", "Berhasil tambah transaksi laundry");
        req.flash("alertStatus", "success");
        req.flash("alertIcon", "fas fa-check");
        res.redirect("/transaksi-laundry");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry/tambah");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const pelanggan = await Pelanggan.find();
      const paket = await Paket.find();
      const transaksiLaundry = await TransaksiLaundry.findOne({ _id: id }).populate("pelanggan").populate("paket");

      res.render("admin/transaksi_laundry/ubah_transaksi_laundry", {
        pelanggan,
        paket,
        transaksiLaundry,
        title: "Laundryin | Ubah Transaksi Laundry",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { pelanggan, paket, jumlahKiloan, tanggalAmbil, catatan } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const transaksiLaundry = await TransaksiLaundry.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${transaksiLaundry.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await TransaksiLaundry.findOneAndUpdate(
              { _id: id },
              {
                pelanggan,
                paket,
                jumlahKiloan,
                tanggalAmbil,
                catatan,
                thumbnail: filename,
              }
            );

            req.flash("alertMessage", "Berhasil ubah transaksi laundry");
            req.flash("alertStatus", "success");
            req.flash("alertIcon", "fas fa-check");
            res.redirect("/transaksi-laundry");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            req.flash("alertIcon", "fas fa-ban");
            res.redirect("/transaksi-laundry");
          }
        });
      } else {
        await TransaksiLaundry.findOneAndUpdate(
          { _id: id },
          {
            pelanggan,
            paket,
            jumlahKiloan,
            tanggalAmbil,
            catatan,
          }
        );

        req.flash("alertMessage", "Berhasil ubah transaksi laundry");
        req.flash("alertStatus", "success");
        req.flash("alertIcon", "fas fa-check");
        res.redirect("/transaksi-laundry");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await TransaksiLaundry.findOneAndRemove({ _id: id });

      req.flash("alertMessage", "Berhasil hapus transaksi laundry");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/transaksi-laundry");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const pelanggan = await Pelanggan.find();
      const paket = await Paket.find();
      const transaksiLaundry = await TransaksiLaundry.findOne({ _id: id }).populate("pelanggan").populate("paket");

      res.render("admin/transaksi_laundry/detail_transaksi_laundry", {
        transaksiLaundry,
        pelanggan,
        paket,
        alert,
        title: "Laundryin | Detail Transaksi Laundryin",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },
  actionCuci: async (req, res) => {
    try {
      const { id } = req.params;
      const transaksiLaundry = await TransaksiLaundry.findOne({ _id: id }).populate("pelanggan").populate("paket");
      transaksiLaundry.statusCuci = "dicuci";
      await transaksiLaundry.save();

      req.flash("alertMessage", `Pakaian/laundry "${transaksiLaundry.pelanggan.name}" sedang dicuci`);
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect(`/transaksi-laundry/detail/${id}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect(`/transaksi-laundry/detail/${id}`);
    }
  },
  actionSelesaiCuci: async (req, res) => {
    try {
      const { id } = req.params;
      const transaksiLaundry = await TransaksiLaundry.findOne({ _id: id }).populate("pelanggan").populate("paket");
      transaksiLaundry.statusCuci = "selesai";
      await transaksiLaundry.save();

      req.flash("alertMessage", `Pakaian/laundry "${transaksiLaundry.pelanggan.name}" selesai dicuci`);
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect(`/transaksi-laundry/detail/${id}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect(`/transaksi-laundry/detail/${id}`);
    }
  },
  // actionTolak: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const transaksiLaundry = await TransaksiLaundry.findOne({ _id: id }).populate("pelanggan").populate("paket");

  //     transaksiLaundry.status = "Belum Bayar";
  //     await transaksiLaundry.save();

  //     req.flash("alertMessage", `Berhasil tolak transaksi laundry ${transaksiLaundry.pelanggan.name}`);
  //     req.flash("alertStatus", "success");
  //     req.flash("alertIcon", "fas fa-check");
  //     res.redirect(`/transaksi-laundry/detail/${id}`);
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", "danger");
  //     req.flash("alertIcon", "fas fa-ban");
  //     res.redirect(`/transaksi-laundry/${id}`);
  //   }
  // },
};
