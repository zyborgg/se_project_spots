const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modal = document.querySelector("#edit-profile-modal");
const closeButton = modal.querySelector(".modal__close-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

closeButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const addProfileButton = document.querySelector(".profile__add-button");
const addProfileModal = document.querySelector("#new-post-modal");
const addCloseButton = addProfileModal.querySelector(".modal__close-button");

addProfileButton.addEventListener("click", function () {
  addProfileModal.classList.add("modal_is-opened");
});

addCloseButton.addEventListener("click", function () {
  addProfileModal.classList.remove("modal_is-opened");
});

const addCardFormElement = document.querySelector(".modal__form");
const imageInput = document.querySelector("#card-image-input");
const captionInput = document.querySelector("#caption-input");

console.log("Form element:", addCardFormElement);
console.log("Image input:", imageInput);
console.log("Caption input:", captionInput);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(imageInput.value);
  console.log(captionInput.value);
  addProfileModal.classList.remove("modal_is-opened");
}
