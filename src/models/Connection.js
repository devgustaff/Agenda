const mongoose = require("mongoose");

class Connection {
  connect() {
    mongoose.connect(
      process.env.CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      () => console.log("Connected")
    );
  }
}

module.exports = Connection;
