const notFound = (req, res, next) => {
  const error = new Error("Not found");
  res.status((error.status = 404 || 500));
  res.render("error-404");
  next();
};

module.exports = notFound;
