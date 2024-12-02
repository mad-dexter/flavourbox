class ModalView {
  _ctaSection = document.querySelector(".section-cta-modal");
  _ctaSectionWrapper = document.querySelector(".cta-section-wrapper");
  _crossBtn = document.querySelector(".cross-icon");
  _documentBody = document.querySelector("body");
  _contactUsBtn = document.querySelector(".contact-us");

  constructor() {
    this._contactUsBtn?.addEventListener("click", this._showModal.bind(this));

    this._crossBtn?.addEventListener("click", this._hideModal.bind(this));

    this._ctaSectionWrapper?.addEventListener("click", function (event) {
      if (event.target === ctaSectionWrapper) {
        hideModal();
      }
    });
  }

  _hideModal() {
    // Hide modal
    this._ctaSection.classList.add("cta-hide");
    this._ctaSectionWrapper.classList.add("cta-wrapper-hide");
    this._documentBody.classList.remove("overflow-y-hidden");
  }

  _showModal() {
    // Show the modal on button click
    this._ctaSection.classList.toggle("cta-hide");
    this._ctaSectionWrapper.classList.toggle("cta-wrapper-hide");
    this._documentBody.classList.toggle("overflow-y-hidden");
  }
}

export default new ModalView();
