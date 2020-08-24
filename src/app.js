const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const Connection = require("./models/Connection");
const routes = require("./routers/routes");
const localsVar = require("./middlewares/localsVar");
const notFound = require("./middlewares/notFound");
require("dotenv/config");

class App {
  constructor() {
    this.connection = new Connection();
    this.connection.connect();
    this.app = express();
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "ejs");
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
    this.app.use(
      session({
        secret: "woot",
        resave: false,
        saveUninitialized: true,

        store: new mongoStore({
          mongooseConnection: mongoose.connection,
        }),
      })
    );
    this.app.use(flash());
    this.app.use(localsVar);
    this.app.use(routes);
    this.app.use(notFound);
  }
}

module.exports = new App().app;
