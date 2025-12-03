# Project 3: Spots

an image sharing website that can be used on desktop, tablet, and mobile!

## Tech Stack

-HTML
-CSS
-Responsive design

### Overview

- Intro
- Figma
- Images

**Intro**

This project is made so all the elements are displayed correctly on popular screen sizes. We recommend investing more time in completing this project, since it's more difficult than previous ones.

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/BBNm2bC3lj8QQMHlnqRsga/Sprint-3-Project-%E2%80%94-Spots?type=design&node-id=2%3A60&mode=design&t=afgNFybdorZO6cQo-1)

**Images**
all images have been optimized to ensure fast load time

heres my revision thank you so much for the review it really helped point me in the right direction, this assignment was tricky!

## Deployment

-Deployment link: https://zyborgg.github.io/se_project_spots or git@github.com:zyborgg/se_project_spots.git
-Video showcasing project link: https://drive.google.com/file/d/1fOQx4MpRSi5NVqOp-Q0aQW8R-7wf-kUO/view?usp=sharing
-Video showing modal open and closing animations link: https://drive.google.com/file/d/1rz3BdzhAJ1z5YKwD6d__emV0XwLUBKKn/view?usp=sharing

updated to spots stage 8 generating cards dynamically

original delete function
const cardDeleteBtnEl = cardElement.querySelector(".card\_\_delete-button");
cardDeleteBtnEl.addEventListener("click", () => {
cardDeleteBtnEl.closest(".card").remove();
});

const hasInvalidInput = (inputList) => {
return inputList.some((input) => {
return !input.validity.valid;
});
};

const toggleButtonState = (inputList, buttonEl) => {
if (hasInvalidInput(inputList)) {
buttonEl.disabled = true;
buttonEl.classList.add("modal**button_disabled");
} else {
buttonEl.disabled = false;
buttonEl.classList.remove("modal**button_disabled");
}
};

setEventListeners = (formEl) => {
const inputList = Array.from(formEl.querySelectorAll(".modal**input"));
const buttonElement = formEl.querySelector(".modal**submit-button");

toggleButtonState(inputList, buttonElement);

inputList.forEach((inputEl) => {
inputEl.addEventListener("input", function () {
checkInputValidity(formEl, inputEl);
toggleButtonState(inputList, buttonElement);
});
});
};

const enableValidation = () => {
const formList = Array.from(document.querySelectorAll(".modal\_\_form"));
formList.forEach((formEl) => {
setEventListeners(formEl);
});
};

enableValidation();

// re-organizing index //
//
//

// edit profile stuff //
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal**close");
const editProfileForm = editProfileModal.querySelector(".modal**form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

// profile elements //
const editProfileButton = document.querySelector(".profile\*\*edit-button");
const newPostButton = document.querySelector(".profile\*\*add-button");
const profileNameEl = document.querySelector(".profile\*\*name");
const profileDescriptionEl = document.querySelector(".profile\_\_description");

// edit form elements //
const newPostModal = document.querySelector("#new-post-modal");
const newCardFormElement = newPostModal.querySelector(".modal**form");
const newCloseButton = newPostModal.querySelector(".modal**close");

// card form elements //
const imageInput = document.querySelector("#card-image-input");
const captionInput = document.querySelector("#caption-input");
const cardSubmitButton = newPostModal.querySelector(".modal\*\*submit-button");

// preview image popup elements //
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal**image");
const previewModalCaption = previewModal.querySelector(".modal\_\_caption");
const previewModalCloseBtn = previewModal.querySelector(".modal**close");

// card related elements //
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardsList = document.querySelector(".cards\_\_list");

//////////////
previous index order
const cardTemplate = document
.querySelector("#card-template")
.content.querySelector(".card");
const cardsList = document.querySelector(".cards\_\_list");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal**close");
const previewModalImageEl = previewModal.querySelector(".modal**image");
const previewModalCaption = previewModal.querySelector(".modal\_\_caption");

previewModalCloseBtn.addEventListener("click", () => {
closeModal(previewModal);
});

function getCardElement(data) {
const cardElement = cardTemplate.cloneNode(true);
const cardTitleEl = cardElement.querySelector(".card**title");
const cardImageEl = cardElement.querySelector(".card**image");

cardImageEl.src = data.link;
cardImageEl.alt = data.name;
cardTitleEl.textContent = data.name;

const cardLikeBtnEl = cardElement.querySelector(".card**like-button");
cardLikeBtnEl.addEventListener("click", () => {
cardLikeBtnEl.classList.toggle("card**like-button_active");
});

const cardDeleteBtnEl = cardElement.querySelector(".card\_\_delete-button");
cardDeleteBtnEl.addEventListener("click", (evt) => {
evt.stopPropagation();
cardElement.remove();
});

cardImageEl.addEventListener("click", () => {
previewModalImageEl.src = data.link;
previewModalImageEl.alt = data.name;
previewModalCaption.textContent = data.name;
openModal(previewModal);
});

return cardElement;
}

function openModal(modal) {
modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
modal.classList.remove("modal_is-opened");
}

//edit profile stuff
const editProfileButton = document.querySelector(".profile**edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal**close");
const editProfileForm = editProfileModal.querySelector(".modal**form");
const editProfileNameInput = editProfileModal.querySelector(
"#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
"#profile-description-input"
);
const profileNameEl = document.querySelector(".profile**name");
const profileDescriptionEl = document.querySelector(".profile\_\_description");

editProfileButton.addEventListener("click", function () {
editProfileNameInput.value = profileNameEl.textContent.trim();
editProfileDescriptionInput.value = profileDescriptionEl.textContent.trim();
openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
closeModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
evt.preventDefault();
profileNameEl.textContent = editProfileNameInput.value.trim();
profileDescriptionEl.textContent = editProfileDescriptionInput.value.trim();
closeModal(editProfileModal);
}

//new post stuff

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const newPostButton = document.querySelector(".profile**add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newCloseButton = newPostModal.querySelector(".modal**close");

newPostButton.addEventListener("click", function () {
openModal(newPostModal);
});

newCloseButton.addEventListener("click", function () {
closeModal(newPostModal);
});

// card form elements
const newCardFormElement = newPostModal.querySelector(".modal**form");
const imageInput = document.querySelector("#card-image-input");
const captionInput = document.querySelector("#caption-input");
const cardSubmitBtn = document.querySelector(".modal**submit-button");

function handleAddCardSubmit(evt) {
evt.preventDefault();
const inputValues = {
name: captionInput.value,
link: imageInput.value,
};
const cardElement = getCardElement(inputValues);
cardsList.prepend(cardElement);
newCardFormElement.reset();
disableButton(cardSubmitBtn);
closeModal(newPostModal);
}
newCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
const cardElement = getCardElement(item);
cardsList.append(cardElement);
});
