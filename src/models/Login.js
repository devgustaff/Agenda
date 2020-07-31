const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.email = body.email;
    this.password = body.password;
    this.errors = [];
    this.user = null;
  }

  async insert() {
    this.validateFields();
    if (this.errors.length > 0) return;

    await this.emailExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();

    this.password = bcryptjs.hashSync(this.password, salt);
    this.user = await LoginModel.create({
      email: this.email,
      password: this.password,
    });
  }

  async logIn() {
    this.validateFields();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.email });

    if (!this.user) {
      this.errors.push("Usuário não existe");
      return;
    }
    if (!bcryptjs.compareSync(this.password, this.user.password)) {
      this.errors.push("Senha inválida.");
      this.user = null;
      return;
    }
  }

  async emailExists() {
    this.user = await LoginModel.findOne({ email: this.email });
    if (this.user) this.errors.push("Usuário já existe");
  }

  // Valida os campos
  validateFields() {
    if (!validator.isEmail(this.email)) this.errors.push("E-mail inválido");
    if (this.password.length < 3 || this.password.length > 50)
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres.");
  }
}

module.exports = Login;
