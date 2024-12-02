import { LOGGED_IN_USER_KEY, USER_LIST_KEY } from "./configuration.js";
import { getJsonResponseFromAPI } from "./helper.js";

// User class
class User {
  firstName;
  lastName;
  email;
  password;
  cart;
  liked;
  initial;

  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.cart = [];
    this.liked = [];
    this._generateInitials();
  }

  _generateInitials() {
    this.initial =
      this.firstName.at(0).toUpperCase() + this.lastName.at(0).toUpperCase();
  }

  populateCartData(cartItems) {
    cartItems.forEach((item) => this.cart.push(item));
  }

  populateLikedData(likedItems) {
    likedItems.forEach((item) => this.liked.push(item));
  }
}

export const users = [];

export const state = {
  loggedInUser: {},
  searchResults: [],
};

// Model methods
const setDataInLocalStorage = function (data, key) {
  localStorage.setItem(key, JSON.stringify(data));
};

const getDatafromLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

export const logOffUser = function () {
  state.loggedInUser = {};
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
};

export const createNewUser = function (data) {
  // Check if the email is existing
  if (users.some((user) => user.email === data.email)) {
    throw new Error("User already exists. Please try with new email.");
  }
  const finalUser = new User(
    data.firstname,
    data.lastname,
    data.email,
    data.password
  );

  // Append the user
  users.push(finalUser);

  // Login the user
  state.loggedInUser = finalUser;
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  setDataInLocalStorage(users, USER_LIST_KEY);
};

export const loginUserModel = function (data) {
  const userLoggedIn = users.find(
    (user) => user.email === data.email && user.password === data.password
  );
  if (userLoggedIn) {
    // Successfull login
    state.loggedInUser = userLoggedIn;
    // Save the login state in storage
    setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  } else {
    // Fail login
    throw new Error(`Invalid login credentials. Please try again!`);
  }
};

const createRecipeObject = function (recipe) {
  return {
    title: recipe.label,
    images: {
      SMALL: recipe.images.SMALL.url,
      LARGE: recipe.images.REGULAR.url,
    },
    ingredientLines: recipe.ingredientLines,
    mealType: recipe.mealType[0],
    source: recipe.source,
    yield: recipe.yield,
    url: recipe.url,
    uri: recipe.uri,
  };
};

const updateRecordinUserList = function () {
  const index = users.findIndex(
    (user) => user.email === state.loggedInUser.email
  );
  if (index !== -1) {
    users[index].cart = state.loggedInUser.cart;
    users[index].liked = state.loggedInUser.liked;
    setDataInLocalStorage(users, USER_LIST_KEY);
  }
};

export const addToCart = function (recipieID) {
  const recipe = state.searchResults.find((el) => el.uri === recipieID);
  if (!recipe) return;

  // Check if the recipie is already in the user cart
  const index = state.loggedInUser.cart.findIndex((el) => el.uri === recipieID);
  if (index === -1) {
    // Its a new item
    recipe.quantity = 1;
    state.loggedInUser.cart.push(recipe);
  } else {
    // Just increase the quantity by 1
    state.loggedInUser.cart[index].quantity += 1;
  }

  // Save the user in local storage
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  updateRecordinUserList();
};

export const addToLiked = function (recipieID) {
  const recipe = state.searchResults.find((el) => el.uri === recipieID);
  if (!recipe) return;

  // Check if the recipie is already in the user Liked list
  const index = state.loggedInUser.liked.findIndex(
    (el) => el.uri === recipieID
  );
  if (index === -1) {
    // Its a new item :: Add to the liked list
    state.loggedInUser.liked.push(recipe);
  } else {
    // Do nothing for NOW :: TODO
  }

  // Save the user in local storage
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  updateRecordinUserList();
};

export const increaseCartItemQuantity = function (recipieID) {
  const index = state.loggedInUser.cart.findIndex((el) => el.uri === recipieID);
  if (index !== -1) {
    state.loggedInUser.cart[index].quantity += 1;
  }
  // Save the user in local storage
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  updateRecordinUserList();
  return state.loggedInUser.cart[index].quantity;
};

export const decreaseCartItemQuantity = function (recipieID) {
  const index = state.loggedInUser.cart.findIndex((el) => el.uri === recipieID);
  if (index !== -1) {
    if (state.loggedInUser.cart[index].quantity > 1)
      state.loggedInUser.cart[index].quantity -= 1;
  }
  // Save the user in local storage
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  updateRecordinUserList();
  return state.loggedInUser.cart[index].quantity;
};

export const deleteCartItem = function (recipieID) {
  const index = state.loggedInUser.cart.findIndex((el) => el.uri === recipieID);
  let deletedItem;
  if (index !== -1) {
    // Delete the item
    deletedItem = state.loggedInUser.cart.splice(index, 1);
  }
  // Save the user in local storage
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  updateRecordinUserList();

  return deletedItem.at(0);
};

export const deleteLikedItemModel = function (recipieID) {
  const index = state.loggedInUser.liked.findIndex(
    (el) => el.uri === recipieID
  );
  let deletedItem;
  if (index !== -1) {
    // Delete the item
    deletedItem = state.loggedInUser.liked.splice(index, 1);
  }
  // Save the user in local storage
  setDataInLocalStorage(state.loggedInUser, LOGGED_IN_USER_KEY);
  updateRecordinUserList();

  return deletedItem.at(0);
};

export const searchFoodCategories = async function (category) {
  const respJson = await getJsonResponseFromAPI(
    `https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=030c5689&app_key=45627b3278b5a67f627bd0972b9d7f73&ingr=5-8&dishType=${category}&imageSize=LARGE&imageSize=REGULAR&count=10`
  );

  // console.log(respJson);
  state.searchResults = respJson.map((recipe) =>
    createRecipeObject(recipe.recipe)
  );
};

// Init method
const init = function () {
  // Check if there is a logged in user.
  const loggedinUserCache = getDatafromLocalStorage(LOGGED_IN_USER_KEY);
  state.loggedInUser = loggedinUserCache ? loggedinUserCache : {};

  // Also load the list of users
  const userList = getDatafromLocalStorage(USER_LIST_KEY);
  if (userList) {
    users.push(
      ...userList.map((user) => {
        const userObj = new User(
          user.firstName,
          user.lastName,
          user.email,
          user.password
        );
        userObj.populateCartData(user.cart);
        userObj.populateLikedData(user.liked);
        return userObj;
      })
    );
  }
};

init();
