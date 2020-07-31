const Contact = require("../models/Contact");

class contactController {
  index(req, res) {
    res.render("contact", { contact: {} });
  }

  async create(req, res) {
    try {
      const contact = new Contact(req.body);
      await contact.insert();
      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => res.redirect("back"));
        return;
      }
      req.flash("success", "Contato criado com sucesso");
      req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
      return;
    } catch (err) {
      console.log(err);
      return res.render("error-404");
    }
  }

  async editContact(req, res) {
    if (!req.params.id) return res.render("error-404");

    const contact = await Contact.getContact(req.params.id);

    if (!contact) return res.render("error-404");
    res.render("contact", { contact });
  }

  async edit(req, res) {
    try {
      if (!req.params.id) return res.render("error-404");
      const contact = new Contact(req.body);
      await contact.update(req.params.id);
      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => res.redirect("back"));
        return;
      }
      req.flash("success", "Contato atualizado com sucesso");
      req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
      return;
    } catch (err) {
      console.log(err);
      return res.render("error-404");
    }
  }

  async remove(req, res) {
    try {
      if (!req.params.id) return res.render("error-404");

      const contact = await Contact.delete(req.params.id);

      if (!contact) return res.render("error-404");
      req.flash("success", "Removido com sucesso");
      req.session.save(() => res.redirect("back"));
      return;
    } catch (err) {
      console.log(err);
      return res.render("error-404");
    }
  }
}

module.exports = new contactController();
