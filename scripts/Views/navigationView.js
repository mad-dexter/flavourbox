class NavigationView {
  _parentElement = document.querySelector(".header");
  _heroEl = document.querySelector(".hero-section");
  constructor() {
    // Sticky navigation implementation
    // Intersection observer check for the mentioned section if its intersecting in the viewport of not
    if (this._heroEl) {
      const obs = new IntersectionObserver(
        this._headerIntersecting.bind(this),
        {
          root: null,
          threshold: 0,
          rootMargin: "-100px",
        }
      );

      // Observe the movement of the hero section in viewport
      obs.observe(this._heroEl);
    }
  }

  _headerIntersecting(entries) {
    const entry = entries[0];
    if (entry.isIntersecting) {
      this._parentElement.classList.remove("sticky");
    } else {
      this._parentElement.classList.add("sticky");
    }
  }
}

export default new NavigationView();
