class BodyView {
  constructor() {
    // Generic event listner only click of body
    document.addEventListener("click", function (e) {
      // Hide the submenu if visible
      const el = e.target.closest(".profile-initial");
      if (e.target !== document.querySelector(".profile-initial")) {
        document.querySelector(".profile-sub--menu")?.classList.add("hide");
      }
    });
  }
}

export default new BodyView();
