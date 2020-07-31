const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: "" },
  phone: { type: Number, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  date: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.name = body.name;
    this.lastname = body.lastname;
    this.phone = body.phone;
    this.email = body.email;
    this.errors = [];
    this.contact = null;
  }

  async insert() {
    this.validateFields();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create({
      name: this.name,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
    });
  }

  static async getContacts() {
    return await ContactModel.find().sort({ date: -1 });
  }

  static async getContact(id) {
    if (typeof id !== "string") return;
    return await ContactModel.findById(id);
  }

  static async delete(id) {
    if (typeof id !== "string") return;
    return await ContactModel.findByIdAndDelete({ _id: id });
  }

  async update(id) {
    if (typeof id !== "string") return;

    this.validateFields();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(
      id,
      {
        name: this.name,
        lastname: this.lastname,
        phone: this.phone,
        email: this.email,
      },
      { new: true }
    );
  }

  validateFields() {
    if (this.email && !validator.isEmail(this.email))
      this.errors.push("E-mail precisa ser válido");
    if (!this.name) this.errors.push("Nome precisa ser preenchido");
    if (!this.email && !this.phone)
      this.errors.push("E-mail ou Telefone precisa ser preenchido");
  }
}

module.exports = Contact;
