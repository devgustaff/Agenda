import validator from "validator";

class ValidateForm {
  constructor(formId) {
    this.form = document.querySelector(formId);
  }

  init() {
    this.handlerForm();
  }

  handlerForm() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const element = e.target;
    const inputEmail = element.querySelector("input[name='email']");
    const inputPass = element.querySelector("input[name='password']");
    let error = false;

    if (!validator.isEmail(inputEmail.value)) {
      alert("E-mail inválido");
      error = true;
    }
    if (inputPass.value.length < 3 || inputPass.value.length > 50) {
      alert("A senha precisa ter entre 3 e 50 caracteres.");
      error = true;
    }
    if (!error) element.submit();
  }
}

export default ValidateForm;
