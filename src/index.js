import "./index.css";
import {
  getCardList,
  getUserInfo,
  addAvatarProfile,
  postNewCard,
  editProfile,
  deletUserCard,
  addLikeforCard,
  unLikeCard,
} from "./components/api.js";
import {
  createCard,
  hasAccesToDel,
  removeCard,
  hasLikedCard,
  addLike,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { _ } from "core-js";

//Объект запросов для манипуляций с карточкой для функии createCard
const apiforCard = {
  delete: deletUserCard,
  like: addLikeforCard,
  unlike: unLikeCard,
};

//DOM: список карточек
const cardsList = document.querySelector(".places__list");

//DOM: Поп-ап с увеличенным изображением карточки
const imagePopup = document.querySelector(".popup_type_image");
const cardImgPopup = imagePopup.querySelector(".popup__image");

//Функция увеличения изображения карточки
function zoomCardImg(cardImg) {
  openPopup(imagePopup);
  cardImgPopup.src = cardImg.src;
  imagePopup.querySelector(".popup__caption").textContent = cardImg.alt;
}

//DOM: Коллекция поп-апов страницы
const popups = document.querySelectorAll(".popup");

//DOM: Поп-ап добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");

// DOM: Поля данных профиля страницы
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// DOM: Поп-ап редактирования информации профиля
const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

// DOM: Поп-ап редактирования аватара профиля
const avatarProfilePopup = document.querySelector(".popup_avatar_edit");
const avatarAddButton = document.querySelector(".avatar__add-button");

// DOM: Форма добавления аватара
const avatarAddForm = document.forms["new-avatar"];
const avatarLink = avatarAddForm.elements["link"];
const profilAvatar = document.querySelector(".profile__image");

// DOM: Форма ввода данных профиля
const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);

// DOM: Форма добавления новой карточки
const newCardForm = document.forms["new-place"];
const placeName = newCardForm.elements["place-name"];
const placeLink = newCardForm.elements["link"];

// Объект для функции валидации с классами
const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button-inactive",
  inputErrorClass: "input_type_error",
  errorClass: "input-error",
};

// Функция изменения аватара профиля через форму
function handleAddAvatarFormSubmit(evt) {
  evt.preventDefault();
  avatarAddForm.querySelector(".popup__button").textContent = "Сохранение...";
  profilAvatar.style.backgroundImage = `url(${avatarLink.value})`;
  addAvatarProfile({ avatar: avatarLink.value })
    .then(() => {
      closePopup(avatarProfilePopup);
      clearValidation(avatarAddForm, formValidationConfig);
      avatarAddForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarAddForm.querySelector(".popup__button").textContent = "Сохранить";
    });
}

// Функция изменения значений полей формы с информацией профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileFormElement.querySelector(".popup__button").textContent =
    "Сохранение...";
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editProfile({ name: nameInput.value, about: jobInput.value })
    .then(() => {
      closePopup(profilePopup);
      profileFormElement.reset();
      clearValidation(profileFormElement, formValidationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileFormElement.querySelector(".popup__button").textContent =
        "Сохранить";
    });
}

// Функция добавления новой карточки через форму с вводом названия и ссылки
function addNewCardItem(evt) {
  evt.preventDefault();
  newCardForm.querySelector(".popup__button").textContent = "Сохранение...";
  postNewCard({ name: placeName.value, link: placeLink.value })
    .then((dataCard) => {
      cardsList.prepend(
        createCard(
          dataCard,
          userId,
          hasAccesToDel,
          removeCard,
          hasLikedCard,
          addLike,
          zoomCardImg,
          apiforCard
        )
      );
      closePopup(addCardPopup);
      newCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardForm.querySelector(".popup__button").textContent = "Сохранить";
    });
}

// Открытие поп-апа для обновления аватара профиля по клику
avatarAddButton.addEventListener("click", () => {
  openPopup(avatarProfilePopup);
});

//Открытие поп-апа для редактирования профиля по клику
profileEditButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(profileFormElement, formValidationConfig);
});

//Открытие поп-апа для добавления карточки по клику
addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

//Закрытие поп-апов по клику на крестик
popups.forEach((item) => {
  const closeButton = item.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(item);
  });
});

//Отправить новый аватар через форму
avatarAddForm.addEventListener("submit", handleAddAvatarFormSubmit);

//Сохранение внесенных изменений в значения полей формы профиля
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Добавить карточку через форму
newCardForm.addEventListener("submit", addNewCardItem);

//Валидация форм
enableValidation(formValidationConfig);

//Переменная для записи полученного от сервера id пользователя
let userId;

Promise.all([getCardList(), getUserInfo()])
  .then(([userCardsList, userInfo]) => {
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    profilAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;
    userCardsList.forEach((userCardItem) => {
      cardsList.append(
        createCard(
          userCardItem,
          userId,
          hasAccesToDel,
          removeCard,
          hasLikedCard,
          addLike,
          zoomCardImg,
          apiforCard
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
