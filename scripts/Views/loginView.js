import loginRegisterView from "./loginRegisterView.js";

class LoginView {
  _navigation = document.querySelector(".navigation");
  _parentElement = document.querySelector(".profile-icons");
  _logoffEventHandler;
  constructor() {
    this._navigation.addEventListener(
      "click",
      this._handleNavigationClicks.bind(this)
    );
  }

  addPageLoadEventHandlers(handler) {
    // On load check if any user is already logged in
    window.addEventListener("load", handler);
  }

  addLogoffEventHandler(handler) {
    this._logoffEventHandler = handler;
  }

  addMarkupToView(data) {
    const html = this._generateHTML(data);
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }

  _generateHTML(data) {
    let html = "";

    if (!data.email) {
      // User is logged in
      html = '<li><button class="btn btn-login">Login</button></li>';
    } else {
      // not logged in
      html = `<li>
              <button class="profile-btn">
                <span class="profile-initial"> ${data.initial} </span>
              </button>
              <div class="profile-sub--menu hide">
                <ul class="profile-sub--menu-list">
                  <li><a href="#" class="sub-menu-link btn-logoff">Log off</a></li>
                </ul>
              </div>
            </li>      
    `;
    }

    return html;
  }

  _handleNavigationClicks(e) {
    // Check if the profile initial button is the one which is clicked
    const target = e.target.closest(".profile-btn");
    if (target) {
      document.querySelector(".profile-sub--menu").classList.toggle("hide");
    }

    // Check if the logoff button is clicked
    const logoff = e.target.closest(".btn-logoff");
    if (logoff) {
      // handle the logoff Event
      this._logoffEventHandler();
    }

    // Check if login button is clicked
    const login = e.target.closest(".btn-login");
    if (login) {
      // Handle the modal open
      loginRegisterView.showModal();
    }
  }
}

export default new LoginView();
