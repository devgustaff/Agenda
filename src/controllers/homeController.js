const Contact = require("../models/Contact");

class homeController {
  async index(req, res) {
    const contacts = await Contact.getContacts();
    res.render("index", { contacts });
  }
}

module.exports = new homeController();
