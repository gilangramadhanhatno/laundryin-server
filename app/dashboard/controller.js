module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Laundry | Dashboard",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/transaksi-laundry");
    }
  },
};
