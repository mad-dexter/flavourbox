class CartView {
  _cartContainer = document.querySelector(".cart-container");
  _checkoutSection = document.querySelector(".checkout-section");

  addOnClickHandlers(
    increaseQtyHandler,
    decreaseQtyHandler,
    deleteItemHandler
  ) {
    this._cartContainer.addEventListener("click", function (e) {
      let itemUri;
      if (e.target.closest(".cart-line--item")) {
        itemUri = e.target.closest(".cart-line--item").dataset.uri;
      }
      // Check if the plus button is clicked
      const plusBtn = e.target.closest(".btn-quantity-plus");
      if (plusBtn) {
        increaseQtyHandler(itemUri);
      }
      // Check if minus button is clicked
      const minusBtn = e.target.closest(".btn-quantity-minus");
      if (minusBtn) {
        decreaseQtyHandler(itemUri);
      }
      // Check if delete button is clicked
      const deleteBtn = e.target.closest(".btn-delete");
      if (deleteBtn) {
        deleteItemHandler(itemUri);
      }
    });
  }

  displayCartItemsInUI(cartItems) {
    let itemDataHtml = "";

    if (cartItems) {
      itemDataHtml = cartItems
        .map((item) => this._generateItemData(item))
        .join("");

      this._checkoutSection.classList.remove("hide");

      // Check if there are any items in the cart
      if (cartItems.length === 0) {
        itemDataHtml = `<p class="food-header-light"><a href="/menu.html"><strong>Add</strong></a> some item to the cart.</p>`;
        this._checkoutSection.classList.add("hide");
      }
    } else {
      itemDataHtml = `<p class="food-header-light">Please login/signup to access cart data</p>`;
      this._checkoutSection.classList.add("hide");
    }
    this._cartContainer.innerHTML = "";
    this._cartContainer.insertAdjacentHTML("beforeend", itemDataHtml);
  }

  updateQuantityInCart(itemURI, currentQty) {
    this._cartContainer
      .querySelector(`[data-uri="${itemURI}"]`)
      .querySelector(".food-quantity").innerHTML = currentQty;
  }

  removeItemFromUI(itemURI) {
    this._cartContainer.querySelector(`[data-uri="${itemURI}"]`).remove();
  }

  _generateItemData(item) {
    const html = `
      <div class="cart-line--item" data-uri="${item.uri}">
              <img src="${item.images.SMALL}" class="cart-food-img-preview" />
              <p class="food-heading">${item.title}</p>
              <div class="food-quantity-box">
                <span class="food-description food-quantity">${item.quantity}</span>
                <div class="btn-container">
                  <button class="btn-quantity btn-quantity-plus">
                    <ion-icon
                      name="add-circle-outline"
                      class="like--icon"
                    ></ion-icon>
                  </button>
                  <button class="btn-quantity btn-quantity-minus">
                    <ion-icon
                      name="remove-circle-outline"
                      class="like--icon"
                    ></ion-icon>
                  </button>
                </div>
              </div>
              <p class="food-price">$20</p>
              <button class="btn-quantity btn-delete">
                <ion-icon name="trash-outline" class="like--icon"></ion-icon>
              </button>
            </div>
    `;

    return html;
  }
}

export default new CartView();
