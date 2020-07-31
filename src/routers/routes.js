const { Router } = require("express");
const router = Router();
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const contactController = require("../controllers/contactController");
const loginRequired = require("../middlewares/loginRequired");

router.get("/", homeController.index);

// Login
router.get("/login", loginController.index);
router.post("/login/register", loginController.create);
router.post("/login/login", loginController.login);
router.get("/login/logout", loginController.logout);

// Contato
router.get("/contact", loginRequired, contactController.index);
router.post("/contact/register", loginRequired, contactController.create);
router.get("/contact/:id", loginRequired, contactController.editContact);
router.post("/contact/edit/:id", loginRequired, contactController.edit);
router.get("/contact/remove/:id", loginRequired, contactController.remove);

module.exports = router;
