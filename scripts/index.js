const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modal = document.querySelector("#edit-profile-modal");
const closeButton = modal.querySelector(".modal__close-button");

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

closeButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

const addProfileButton = document.querySelector(".profile__add-button");
const addProfileModal = document.querySelector("#new-post-modal");
const addCloseButton = addProfileModal.querySelector(".modal__close-button");

addProfileButton.addEventListener("click", function () {
  addProfileModal.classList.add("modal_is-opened");
});

addCloseButton.addEventListener("click", function () {
  addProfileModal.classList.remove("modal_is-opened");
});
