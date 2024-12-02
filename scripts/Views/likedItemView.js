class LikedItemView {
  _expandIcon = document.querySelector(".icon-collapase");
  _accordion = document.querySelector(".accordion");
  _accordion_container = document.querySelector(".hidden-box");

  constructor() {
    this._expandIcon?.addEventListener("click", function () {
      this._accordion = document.querySelector(".accordion");
      this._accordion_container = document.querySelector(".hidden-box");
      this._accordion.classList.toggle("accordion--expanded");
      this._accordion_container.classList.toggle("show-box");
    });
  }

  displayLikedItemsInUI(likedItems) {
    let itemDataHtml = "";

    if (likedItems) {
      itemDataHtml = likedItems
        .map((item) => this._generateItemData(item))
        .join("");

      // Check if there are any items in the cart
      if (likedItems.length === 0) {
        itemDataHtml = `<p class="food-header-light"><a href="/menu.html"><strong>Add</strong></a> some item to liked items.</p>`;
      }
    } else {
      itemDataHtml = `<p class="food-header-light">Please login/signup to access liked item data</p>`;
    }
    this._accordion_container.innerHTML = "";
    this._accordion_container.insertAdjacentHTML("beforeend", itemDataHtml);
  }

  _generateItemData(item) {
    const html = `
      <div class="cart-line--item margin-b-2-4x" data-uri="${item.uri}">
              <img src="${item.images.SMALL}" class="cart-food-img-preview" />
              <p class="food-heading">${item.title}</p>
              <p class="food-sec-heading">${item.mealType}</p>
              <p class="food-sec-heading">${item.source}</p>
              <button class="btn-quantity btn-like-delete">
                <ion-icon name="trash-outline" class="like--icon"></ion-icon>
              </button>
            </div>
    `;

    return html;
  }

  removeItemFromUI(itemURI) {
    this._accordion_container.querySelector(`[data-uri="${itemURI}"]`).remove();
    if (
      this._accordion_container.querySelectorAll(".cart-line--item").length ===
      0
    ) {
      // Append message in UI that no more liked items
      this._accordion_container.innerHTML = "";
      this._accordion_container.insertAdjacentHTML(
        "beforeend",
        '<p class="food-header-light"><a href="/menu.html"><strong>Add</strong></a> some item to liked items.'
      );
    }
  }

  addOnClickHandlers(deleteItemHandler) {
    this._accordion_container.addEventListener("click", function (e) {
      let itemUri;
      if (e.target.closest(".cart-line--item")) {
        itemUri = e.target.closest(".cart-line--item").dataset.uri;
      }

      // Check if delete button is clicked
      const deleteBtn = e.target.closest(".btn-like-delete");
      if (deleteBtn) {
        deleteItemHandler(itemUri);
      }
    });
  }
}

export default new LikedItemView();
