const Paket = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const paket = await Paket.find();
      res.render("admin/paket/view_paket", {
        paket,
      });
    } catch (error) {
      console.log(error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/paket/tambah_paket");
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, waktuKerja, harga } = req.body;
      let paket = await Paket({ name, waktuKerja, harga });

      await paket.save();

      res.redirect("/paket");
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

      res.redirect("/paket");
    } catch (error) {
      console.log(error);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Paket.findOneAndRemove({
        _id: id,
      });

      res.redirect("/paket");
    } catch (error) {
      console.log(error);
    }
  },
};
