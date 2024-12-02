class ToastView {
  _toastBox = document.querySelector(".toastBox");
  showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.innerHTML = '<button class="close-btn">X</button>' + message;
    this._toastBox.appendChild(toast);

    const closeButton = toast.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      toast.remove();
    });

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

export default new ToastView();
