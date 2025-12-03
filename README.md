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
