const Login = require("../models/Login");

class loginController {
  index(req, res) {
    if (req.session.user) return res.render("log-on");
    return res.render("login");
  }

  async create(req, res) {
    try {
      const login = new Login(req.body);
      await login.insert();
      if (login.errors.length > 0) {
        req.flash("errors", login.errors);
        req.session.save(() => res.redirect("back"));
        return;
      }
      req.flash("success", "Usuário criado com sucesso");
      req.session.save(() => res.redirect("back"));
    } catch (err) {
      console.log(err);
      return res.render("error-404");
    }
  }

  async login(req, res) {
    try {
      const login = new Login(req.body);
      await login.logIn();
      if (login.errors.length > 0) {
        req.flash("errors", login.errors);
        req.session.save(() => res.redirect("back"));
        return;
      }
      req.flash("success", "Logado com sucesso");
      req.session.user = login.user;
      req.session.save(() => res.redirect("back"));
    } catch (err) {
      console.log(err);
      return res.render("error-404");
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = new loginController();
