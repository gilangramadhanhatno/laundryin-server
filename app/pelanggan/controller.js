module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/pelanggan/view_pelanggan", {
        title: "Laundryin",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
