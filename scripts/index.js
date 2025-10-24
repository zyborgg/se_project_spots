const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
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

editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const newProfileButton = document.querySelector(".profile__add-button");
const newProfileModal = document.querySelector("#new-post-modal");
const newCloseButton = newProfileModal.querySelector(".modal__close-button");

newProfileButton.addEventListener("click", function () {
  newProfileModal.classList.add("modal_is-opened");
});

newCloseButton.addEventListener("click", function () {
  newProfileModal.classList.remove("modal_is-opened");
});

const newCardFormElement = newProfileModal.querySelector(".modal__form");
const imageInput = document.querySelector("#card-image-input");
const captionInput = document.querySelector("#caption-input");

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(imageInput.value);
  console.log(captionInput.value);
  newProfileModal.classList.remove("modal_is-opened");
}
newCardFormElement.addEventListener("submit", handleAddCardSubmit);
