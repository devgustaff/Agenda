const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const routes = require("./routers/routes");
const localsVar = require("./middlewares/localsVar");
const notFound = require("./middlewares/notFound");
require("dotenv/config");

mongoose.connect(
  process.env.CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Connected")
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "woot",
    resave: false,
    saveUninitialized: true,
    
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(flash());
app.use(localsVar);
app.use(routes);
app.use(notFound);

module.exports = app;
