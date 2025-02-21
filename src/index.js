import "./index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, addLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

//DOM: список карточек
const cardsList = document.querySelector(".places__list");

//DOM: Поп-ап с увеличенным изображением карточки
const imagePopup = document.querySelector(".popup_type_image");
const cardImgPopup = imagePopup.querySelector(".popup__image");

//Функция увеличения изображения карточки
export function zoomCardImg(cardImg) {
  openPopup(imagePopup);
  cardImgPopup.src = cardImg.src;
  imagePopup.querySelector(".popup__caption").textContent = cardImg.alt;
}

// Вывод карточек из массива на страницу
initialCards.forEach(function (item) {
  cardsList.append(createCard(item, removeCard, addLike));
});

//DOM: Массив поп-апов страницы
export const popups = document.querySelectorAll(".popup");

//DOM: Поп-ап редактирования информации профиля
const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

//DOM: Поп-ап добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");

//Открытие поп-апа для редактирования профиля по клику
profileEditButton.addEventListener("click", () => openPopup(profilePopup));

//Открытие поп-апа для добавления карточки по клику
addCardButton.addEventListener("click", () => openPopup(addCardPopup));

//DOM: Массив кнопок крестиков поп-апов страницы
const buttonsClose = document.querySelectorAll(".popup__close");

//Закрытие поп-апа по клику на крестик
buttonsClose.forEach((item) => item.addEventListener("click", closePopup));

// DOM: Форма ввода данных профиля
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// Функция изменения значений полей формы с информацией профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closePopup();
  formElement.reset();
}

//Сохранение внесенных изменений в значения полей формы профиля
formElement.addEventListener("submit", handleFormSubmit);

// DOM: Форма добавления новой карточки
const newCardForm = document.forms["new-place"];
const placeName = newCardForm.elements["place-name"];
const placeLink = newCardForm.elements["link"];

// Функция добавления новой карточки через форму с вводом названия и ссылки
function addNewCardItem(evt) {
  evt.preventDefault();
  const newCardItem = { name: placeName.value, link: placeLink.value };
  cardsList.prepend(createCard(newCardItem, removeCard, addLike, zoomCardImg));
  closePopup();
  newCardForm.reset();
}

newCardForm.addEventListener("submit", addNewCardItem);
