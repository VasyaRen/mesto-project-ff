//Спасибо большое за подробные разъяснения

import "./index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, addLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

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

// Вывод карточек из массива на страницу
initialCards.forEach((item) => {
  cardsList.append(createCard(item, removeCard, addLike, zoomCardImg));
});

//DOM: Коллекция поп-апов страницы
 const popups = document.querySelectorAll(".popup");

//DOM: Поп-ап добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");

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
})

//DOM: Поля данных профиля страницы
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description"); 

//DOM: Поп-ап редактирования информации профиля
const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

// DOM: Форма ввода данных профиля
const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");

//Открытие поп-апа для редактирования профиля по клику
profileEditButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; 
});

// Функция изменения значений полей формы с информацией профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
  profileFormElement.reset();
}

//Сохранение внесенных изменений в значения полей формы профиля
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// DOM: Форма добавления новой карточки
const newCardForm = document.forms["new-place"];
const placeName = newCardForm.elements["place-name"];
const placeLink = newCardForm.elements["link"];

// Функция добавления новой карточки через форму с вводом названия и ссылки
function addNewCardItem(evt) {
  evt.preventDefault();
  const newCardItem = { name: placeName.value, link: placeLink.value };
  cardsList.prepend(createCard(newCardItem, removeCard, addLike, zoomCardImg));
  closePopup(addCardPopup);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", addNewCardItem);
