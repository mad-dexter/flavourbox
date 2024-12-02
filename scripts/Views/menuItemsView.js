class MenuItemsView {
  _foodCategoryButtons = document.querySelectorAll(".food-btn");
  _currSlide = 0;
  _leftBtn = document.querySelector(".menu-carousel-left");
  _rightBtn = document.querySelector(".menu-carousel-right");
  _foodCarousel = document.querySelector(".food-carousel");
  _foodImageTitle = document.querySelector(".food-image-title");
  _menuDesc = document.querySelector(".menu-desc");

  constructor() {
    this._rightBtn.addEventListener("click", this.moveSlidesForward.bind(this));
    this._leftBtn.addEventListener("click", this.moveSlideBackwards.bind(this));
    this._foodImageTitle.innerHTML =
      '<p class="margin-t-6-4x"><span class="food-header-light">Click on any of the top categories</span></p>';
    this._menuDesc.innerHTML = "";

    // Remove all the food previews
    document
      .querySelectorAll(".food-preview-container")
      .forEach((el) => el.remove());
  }

  addSelectedFoodToUI(data) {
    if (!data) return;

    // Select the existing food if any and delete it
    this._foodImageTitle.innerHTML = "";
    this._menuDesc.innerHTML = "";

    // Check word count in title
    const words = data.title.split(" ");
    const length = data.title.split(" ").length;
    let word1, word2;
    if (length < 2) {
      word1 = data.title;
      word2 = "";
    } else if (length === 2) {
      word1 = `${words.splice(0, 1)}`;
      word2 = `${words.splice(0, 1)}`;
    } else {
      word1 = `${words.splice(0, 1)} ${words.splice(0, 1)}`;
      word2 = words.join(" ");
    }

    // add it in menu-main
    const mainHtml = `     
              <img class="food-img-main" src="${data.images.LARGE}" alt="Image of ${data.title}">
              <div class="title-container">
                <p class="pre-header">#${data.mealType}</p>
                <p class="food-header">
                  <span class="food-header-light">${word1}</span><br>
                  <span class="food-header-bold">${word2}</span>
                </p>
                <button class="app-button add-to-cart">
                  Add to Cart
                  <ion-icon name="add-circle" class="plus-icon"></ion-icon>
                </button>
                <span class="hidden selected-item-to-add" data-uri=${data.uri}></span>
              </div>
            
    `;

    const sideHtml = `
    <div class="tab-content">
              <article class="food-desc">
                <p class="rating">
                  <span class="rate">${
                    data.yield
                  }</span><span class="star">*</span>
                </p>
                <p class="chef-name tertiary-header">${data.source}</p>
                <p class="food-description primary--description">
                  <ul class="ing-items">
                    ${data.ingredientLines
                      .map((val) => `<li>${val}</li>`)
                      .join("")} 
                  </ul>
                </p>
                <p class="margin-t-2-4x"><a href="${
                  data.url
                }" class="contact-link" target="_blank">Goto Recipe page &rarr;</a></p>
                <div class="like-button-container">
                  <button class="like-btns btn--like">
                    <ion-icon
                      name="thumbs-up-outline"
                      class="like-icon"
                    ></ion-icon>
                  </button>
                  <button class="like-btns">
                    <ion-icon
                      name="thumbs-down-outline"
                      class="like-icon"
                    ></ion-icon>
                  </button>
                </div>
              </article>
            </div>
    `;

    // Append the HTML
    this._foodImageTitle.insertAdjacentHTML("beforeend", mainHtml);
    this._menuDesc.insertAdjacentHTML("beforeend", sideHtml);
  }

  addFoodsToUI(data) {
    // Reset the old data
    document
      .querySelectorAll(".food-preview-container")
      .forEach((el) => el.remove());

    this._foodImageTitle.innerHTML = "";

    // Form the HTML
    let html = '<div class="food-preview-container">';
    let count = 0;
    data.forEach((item) => {
      count++;
      if (count > 5) {
        count = 1;
        // add a new container
        html += '</div><div class="food-preview-container">';
      }
      html += `<div class="food-preview" data-uri="${item.uri}">
                  <img class="food-img-preview" src="${item.images.SMALL}" alt="Image of ${item.title}">
                  <p class="food-title-preview">${item.title}</p>
                </div>`;
    });
    if (count <= 5) {
      html += "</div>";
    }
    this._foodCarousel.insertAdjacentHTML("beforeend", html);

    // Position the slider elements on service call
    document
      .querySelectorAll(".food-preview-container")
      .forEach((slide, index) => {
        // Setting initial value on page load
        slide.style.transform = `translateX(${100 * index}%)`;
      });
  }

  moveSlidesForward() {
    const maxSlides = document.querySelectorAll(
      ".food-preview-container"
    ).length;
    if (this._currSlide === maxSlides - 1) {
      this._currSlide = 0;
    } else {
      this._currSlide++;
    }
    document
      .querySelectorAll(".food-preview-container")
      .forEach((slide, index) => {
        // slide.style.transform = `translateX(${
        //   100 * (index - this._currSlide)
        // }%`;

        slide.style.transform = `translateX(-${100 * this._currSlide}%`;
      });
  }

  moveSlideBackwards() {
    const maxSlides = document.querySelectorAll(
      ".food-preview-container"
    ).length;
    if (this._currSlide === 0) {
      this._currSlide = maxSlides - 1;
    } else {
      this._currSlide--;
    }
    document
      .querySelectorAll(".food-preview-container")
      .forEach((slide, index) => {
        // slide.style.transform = `translateX(${
        //   100 * (index - this._currSlide)
        // }%`;

        slide.style.transform = `translateX(${
          this._currSlide === 0 ? "" : "-"
        }${100 * this._currSlide}%`;
      });
  }

  // addEventHandlerForFoodCategories(handler) {
  //   this._foodCategoryButtons.forEach((btn) =>
  //     btn.addEventListener("click", function () {
  //       handler(this.dataset.action);
  //     })
  //   );
  // }

  addEventHandlerForFoodItemClick(handler) {
    this._foodCarousel.addEventListener("click", function (e) {
      const target = e.target.closest(".food-preview");
      if (!target) return;

      // Unselect all the previous selected element
      document
        .querySelectorAll(".food-preview")
        .forEach((el) => el.classList.remove("food-preview--selected"));

      // Add CSS class to make it selected
      target.classList.add("food-preview--selected");
      handler(target.dataset.uri);
    });
  }

  // Add event listner for hash load
  addEventForLoad(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addEventListnerforAddtoCartBtn(handler) {
    this._foodImageTitle.addEventListener("click", function (e) {
      // Check if the closest element is a button
      const el = e.target.closest(".add-to-cart");
      if (!el) return; // Guard statement

      const elSelected = document.querySelector(".selected-item-to-add").dataset
        .uri;
      handler(elSelected);
    });
  }

  addEventListnerforLikeBtn(handler) {
    this._menuDesc.addEventListener("click", function (e) {
      // Check if the closest element is a like button that's clicked
      const el = e.target.closest(".btn--like");
      if (!el) return; // Guard statement

      const elSelected = document.querySelector(".selected-item-to-add").dataset
        .uri;
      handler(elSelected);
    });
  }
}

export default new MenuItemsView();
