class LoginRegisterView {
  _loginForm = document.querySelector(".login-form");
  _registerForm = document.querySelector(".register-form");
  _loginModal = document.querySelector(".login-modal");
  _loginSectionOverlay = document.querySelector(".login-section-overlay");
  _messageContainer = document.querySelector(".message-container");

  constructor() {
    document
      .querySelector(".login-tab")
      .addEventListener("click", this._loginTabClick.bind(this));

    document
      .querySelector(".cross-icon--right")
      .addEventListener("click", this.hideModal.bind(this));
  }

  addEventHandlerForLoginFormSubmit(handler) {
    this._loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // We can use FormData Api to get all the form data easily
      const formEntries = Object.fromEntries([...new FormData(this)]);
      handler(formEntries);
    });
  }

  addEventHandlerForRegisterFormSubmit(handler) {
    this._registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // We can use FormData Api to get all the form data easily
      const formData = [...new FormData(this)];
      const formEntries = Object.fromEntries(formData);
      handler(formEntries);
    });
  }

  displayErrorMessage(message) {
    const msgHtml = `<p class="error">
    ${message}
    </p>`;
    this._messageContainer.innerHTML = "";
    this._messageContainer.insertAdjacentHTML("beforeend", msgHtml);
  }

  displaySuccessMessage(message) {
    const msgHtml = `<p class="success">
    ${message}
    </p>`;
    this._messageContainer.innerHTML = "";
    this._loginForm.innerHTML = "";
    this._registerForm.innerHTML = "";
    this._messageContainer.insertAdjacentHTML("beforeend", msgHtml);
  }

  _loginTabClick(e) {
    const action = e.target.dataset.action;
    if (!action) return;
    document
      .querySelectorAll(".login-tab-btn")
      .forEach((el) => el.classList.remove("tab-button--selected"));
    e.target.classList.add("tab-button--selected");

    document
      .querySelectorAll(".user-cred")
      .forEach((f) => f.classList.add("hide"));
    document.querySelector(`.${action}-form`).classList.remove("hide");
  }

  hideModal() {
    this._loginModal.classList.add("hide");
    this._loginSectionOverlay.classList.add("hide");
  }

  showModal() {
    this._loginModal.classList.remove("hide");
    this._loginSectionOverlay.classList.remove("hide");
    this._messageContainer.innerHTML = "";
  }
}

export default new LoginRegisterView();
