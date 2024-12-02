import "regenerator-runtime/runtime"; // For async await polyfiling
import "core-js/stable"; // All other polyfiling

import { state, logOffUser, createNewUser, loginUserModel } from "./model.js";

import navigationView from "./Views/navigationView.js";
import bodyView from "./Views/bodyView.js";
import loginView from "./Views/loginView.js";
import modalView from "./Views/modalView.js";
import loginRegisterView from "./Views/loginRegisterView.js";
import cartView from "./Views/cartView.js";
import likedItemView from "./Views/likedItemView.js";

const refreshCartOnLogin = function () {
  cartView.displayCartItemsInUI(state.loggedInUser.cart);
  likedItemView.displayLikedItemsInUI(state.loggedInUser.liked);
};

const checkForLoggedinUser = function () {
  // Call the View for chaging state
  loginView.addMarkupToView(state.loggedInUser);
};

const logOffCurrentUser = function () {
  // Call the model method to logoff current user
  logOffUser();
  // Re render the login UI
  loginView.addMarkupToView(state.loggedInUser);
  refreshCartOnLogin();
};

const registerNewUser = function (formData) {
  try {
    // Check if password and confirm pwd is same
    if (formData.password !== formData.cpassword) {
      throw new Error("Password and Confirm password doesnot matches!!!");
    }
    // Call model with the data
    createNewUser(formData);
    loginView.addMarkupToView(state.loggedInUser);
    // Set success message
    loginRegisterView.displaySuccessMessage("User created successfully :)");
    // Call View to close the modal if no error
    setTimeout(function () {
      loginRegisterView.hideModal();
    }, 2000);
    refreshCartOnLogin();
  } catch (err) {
    loginRegisterView.displayErrorMessage(err.message);
  }
};

const loginUser = function (formData) {
  try {
    loginUserModel(formData);
    loginView.addMarkupToView(state.loggedInUser);
    loginRegisterView.hideModal();
    refreshCartOnLogin();
  } catch (err) {
    loginRegisterView.displayErrorMessage(err.message);
  }
};

// Initializations
const init = function () {
  loginView.addPageLoadEventHandlers(checkForLoggedinUser);
  loginView.addLogoffEventHandler(logOffCurrentUser);
  loginRegisterView.addEventHandlerForLoginFormSubmit(loginUser);
  loginRegisterView.addEventHandlerForRegisterFormSubmit(registerNewUser);
};

init();
