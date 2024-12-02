import "regenerator-runtime/runtime"; // For async await polyfiling
import "core-js/stable"; // All other polyfiling

import { state, searchFoodCategories, addToCart, addToLiked } from "./model.js";

import navigationView from "./Views/navigationView.js";
import bodyView from "./Views/bodyView.js";
import modalView from "./Views/modalView.js";
import menuItemsView from "./Views/menuItemsView.js";
import toastView from "./Views/toastView.js";

const handleFoodCategoryClick = function (category) {
  searchFoodCategories(category).then(function () {
    // Call the menuItemsView to update the UI
    menuItemsView.addFoodsToUI(state.searchResults);
  });
};

const handleClickOnFoodItem = function (foodUri) {
  // Get the food object from State
  const selectedFood = state.searchResults.find(
    (value) => value.uri === foodUri
  );
  // Return the food object to the view
  menuItemsView.addSelectedFoodToUI(selectedFood);
};

const searchFoodsUsingHash = function () {
  const foodCat = window.location.hash.replace("#", "");

  if (!foodCat) return; // Guard statement for situations when the url is hit without any food category
  handleFoodCategoryClick(foodCat);
};

const handleAddToCartBtnClick = function (selectedFood) {
  console.log(`Item ${selectedFood} added to cart`);
  if (!state.loggedInUser.email) {
    // should not add the item in cart
    toastView.showToast("Please login to add items to cart", "error");
    return;
  }
  addToCart(selectedFood);

  // Add the Toast mesage call
  setTimeout(toastView.showToast("Item added to cart"), 1000);
};

const handleLikeBtnClick = function (selectedFood) {
  if (!state.loggedInUser.email) {
    // should not add the item in cart
    toastView.showToast("Please login to add items to wishlist", "error");
    return;
  }
  addToLiked(selectedFood);

  // Add the Toast mesage call
  setTimeout(toastView.showToast("Item added to Liked Items"), 1000);
};

// Initializations
const init = function () {
  // menuItemsView.addEventHandlerForFoodCategories(handleFoodCategoryClick);
  menuItemsView.addEventHandlerForFoodItemClick(handleClickOnFoodItem);
  menuItemsView.addEventForLoad(searchFoodsUsingHash);
  menuItemsView.addEventListnerforAddtoCartBtn(handleAddToCartBtnClick);
  menuItemsView.addEventListnerforLikeBtn(handleLikeBtnClick);
};

init();
