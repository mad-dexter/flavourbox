import "regenerator-runtime/runtime"; // For async await polyfiling
import "core-js/stable"; // All other polyfiling

import {
  state,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  deleteCartItem,
  deleteLikedItemModel,
} from "./model.js";

import cartView from "./Views/cartView.js";
import likedItemView from "./Views/likedItemView.js";
import toastView from "./Views/toastView.js";

const displayCartData = function () {
  cartView.displayCartItemsInUI(state.loggedInUser.cart);
  likedItemView.displayLikedItemsInUI(state.loggedInUser.liked);
};

const increaseItemQuantity = function (itemURI) {
  const newQty = increaseCartItemQuantity(itemURI);
  cartView.updateQuantityInCart(itemURI, newQty);
};

const decreaseItemQuantity = function (itemURI) {
  const newQty = decreaseCartItemQuantity(itemURI);
  cartView.updateQuantityInCart(itemURI, newQty);
};

const deleteItem = function (itemURI) {
  const deletedItem = deleteCartItem(itemURI);

  setTimeout(
    toastView.showToast(`${deletedItem.title} was removed from cart.`),
    1000
  );
  cartView.removeItemFromUI(itemURI);
};

const deleteLikedItem = function (itemURI) {
  const deletedItem = deleteLikedItemModel(itemURI);

  setTimeout(
    toastView.showToast(`${deletedItem.title} was removed from liked items.`),
    1000
  );
  likedItemView.removeItemFromUI(itemURI);
};

const init = function () {
  // Initialize the cart record and display in screen
  displayCartData();

  cartView.addOnClickHandlers(
    increaseItemQuantity,
    decreaseItemQuantity,
    deleteItem
  );

  likedItemView.addOnClickHandlers(deleteLikedItem);
};

init();
