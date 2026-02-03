import "./index.css";
import {
  enableValidation,
  setEventListeners,
  config,
  resetValidation,
  disableButton,
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d5419a41-0c3e-4747-8e9b-422301ed77fc",
    "Content-Type": "application/json",
  },
});

// edit profile stuff //
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

// profile elements //
const editProfileButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__add-button");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileSubmitButton = document.querySelector(
  ".modal__submit_type_profile",
);

// edit form elements //
const newPostModal = document.querySelector("#new-post-modal");
const newCardFormElement = newPostModal.querySelector(".modal__form");
const newCloseButton = newPostModal.querySelector(".modal__close");

// card form elements //
const imageInput = document.querySelector("#card-image-input");
const captionInput = document.querySelector("#caption-input");
const cardSubmitButton = document.querySelector(".modal__submit_type_card");

// preview image popup elements //
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const allModals = document.querySelectorAll(".modal");

// avatar elements //
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#profile-avatar-input");
const avatarImage = document.querySelector(".profile__avatar");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarSubmitButton = avatarModal.querySelector(".avatar__submit-button");
const avatarCloseButton = avatarModal.querySelector(
  ".modal__close_type_avatar",
);

// delete form elements //
const deleteModal = document.querySelector("#delete-modal");
const deleteConfirmButton = deleteModal.querySelector(
  ".card__modal__delete-button",
);
const cardcancel = deleteModal.querySelector(".card__cancel-button");
const deleteModalClose = document.querySelector(".modal__close_type_delete");
let selectedCard;
let selectedCardId;

// card related elements //
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  handleDeleteConfirmation(true);

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      handleDeleteConfirmation(false);
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
      handleDeleteConfirmation(false);
    });
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeButtonEl = cardElement.querySelector(".card__like-button");
  cardLikeButtonEl.addEventListener("click", () => {
    cardLikeButtonEl.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    handleDeleteCard(cardElement, data);
    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

deleteConfirmButton.addEventListener("click", handleDeleteSubmit);
deleteModalClose.addEventListener("click", () => closeModal(deleteModal));
cardcancel.addEventListener("click", () => closeModal(deleteModal));

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("click", handleOverlayClick);
  if (modal === editProfileModal) {
    editProfileForm.reset();
    resetValidation(
      editProfileForm,
      [editProfileNameInput, editProfileDescriptionInput],
      config,
    );
  } else if (modal === newPostModal) {
    newCardFormElement.reset();
    resetValidation(newCardFormElement, [imageInput, captionInput], config);
  } else if (modal === avatarModal) {
    avatarForm.reset();
    resetValidation(avatarForm, [avatarInput], config);
  }
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent.trim();
  editProfileDescriptionInput.value = profileDescriptionEl.textContent.trim();
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    config,
  );
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  renderButtonLoading(true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = editProfileNameInput.value.trim();
      profileDescriptionEl.textContent =
        editProfileDescriptionInput.value.trim();
      renderButtonLoading(false);
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
      renderButtonLoading(false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  renderButtonLoading(true);
  api
    .editAvatarInfo({
      avatar: avatarInput.value,
    })
    .then((data) => {
      avatarInput.value = data.avatar;
      avatarImage.src = data.avatar;
      renderButtonLoading(false);
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
      renderButtonLoading(false);
    });
}

function renderButtonLoading(isLoading) {
  if (isLoading) {
    avatarSubmitButton.textContent = "Saving...";
    profileSubmitButton.textContent = "Saving...";
    cardSubmitButton.textContent = "Saving...";
  } else {
    avatarSubmitButton.textContent = "Save";
    profileSubmitButton.textContent = "Save";
    cardSubmitButton.textContent = "Save";
  }
}

function handleDeleteConfirmation(isDeleting) {
  if (isDeleting) {
    deleteConfirmButton.textContent = "Deleting...";
  } else {
    deleteConfirmButton.textContent = "Delete";
  }
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  renderButtonLoading(true);
  api
    .addCard({
      name: captionInput.value,
      link: imageInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      newCardFormElement.reset();
      disableButton(cardSubmitButton, config);
      renderButtonLoading(false);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.log(err);
      renderButtonLoading(false);
    });
}
newCardFormElement.addEventListener("submit", handleAddCardSubmit);

avatarButton.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarCloseButton.addEventListener("click", function () {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

api
  .getAppInfo()
  .then(([initialCards, userInfo]) => {
    const userName = userInfo.name;
    const userDescription = userInfo.about;
    const profileAvatar = document.querySelector(".profile__avatar");
    profileNameEl.textContent = userName;
    profileDescriptionEl.textContent = userDescription;
    profileAvatar.src = userInfo.avatar;

    initialCards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

enableValidation(config);
