const loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "Você precisa estar logado.");
    req.session.save(() => res.redirect("/"));
    return;
  }
  next();
};

module.exports = loginRequired;
