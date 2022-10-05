const Paket = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const paket = await Paket.find();
      res.render("admin/paket/view_paket", {
        paket,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/paket/tambah_paket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, waktuKerja, harga } = req.body;
      let paket = await Paket({ name, waktuKerja, harga });

      await paket.save();

      req.flash("alertMessage", "Berhasil tambah paket");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/paket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const paket = await Paket.findOne({ _id: id });

      res.render("admin/paket/ubah_paket", {
        paket,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, waktuKerja, harga } = req.body;

      await Paket.findByIdAndUpdate(
        {
          _id: id,
        },
        { name, waktuKerja, harga }
      );

      req.flash("alertMessage", "Berhasil ubah paket");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/paket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Paket.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Berhasil hapus paket");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/paket");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket");
    }
  },
};
