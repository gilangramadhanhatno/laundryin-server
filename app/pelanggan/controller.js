module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Laundryin",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
