// Select all UI elements
// const profileBtn = document.querySelector(".profile-initial");
// const subMenuSection = document.querySelector(".profile-sub--menu");
// const ctaSection = document.querySelector(".section-cta-modal");
// const ctaSectionWrapper = document.querySelector(".cta-section-wrapper");
// // const heroEl = document.querySelector(".hero-section");
// const crossBtn = document.querySelector(".cross-icon");

// const documentBody = document.querySelector("body");

// Javascript code starts here
// ....................................................................

// profileBtn.addEventListener("click", function () {
//   subMenuSection.classList.toggle("hide");
// });

// Generic event listner on body click
// document.addEventListener("click", function (e) {
//   // Hide the submenu if visible
//   if (e.target !== profileBtn) {
//     subMenuSection.classList.add("hide");
//   }
// });

// Code to hide and show CTA MODAL

// const hideModal = function () {
//   // Hide modal
//   ctaSection.classList.add("cta-hide");
//   ctaSectionWrapper.classList.add("cta-wrapper-hide");
//   documentBody.classList.remove("overflow-y-hidden");
// };

// document.querySelectorAll(".contact-us").forEach(function (el) {
//   el.addEventListener("click", function () {
//     // Show the modal on button click
//     ctaSection.classList.toggle("cta-hide");
//     ctaSectionWrapper.classList.toggle("cta-wrapper-hide");
//     documentBody.classList.toggle("overflow-y-hidden");
//   });
// });

// crossBtn?.addEventListener("click", function () {
//   hideModal();
// });

// ctaSectionWrapper?.addEventListener("click", function (event) {
//   if (event.target === ctaSectionWrapper) {
//     hideModal();
//   }
// });

// // Sticky navigation implementation
// // Intersection observer check for the mentioned section if its intersecting in the viewport of not
// if (heroEl) {
//   const obs = new IntersectionObserver(
//     function (entries) {
//       const entry = entries[0];
//       if (entry.isIntersecting) {
//         document.querySelector(".header").classList.remove("sticky");
//       } else {
//         document.querySelector(".header").classList.add("sticky");
//       }
//     },
//     {
//       root: null,
//       threshold: 0,
//       rootMargin: "-100px",
//     }
//   );

//   // Observe the movement of the hero section in viewport
//   obs.observe(heroEl);
// }
