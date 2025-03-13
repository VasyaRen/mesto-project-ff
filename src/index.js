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
import { handleSubmit } from "./utils/utils.js";

//Объект запросов для манипуляций с карточкой для функии createCard
const requestsForCard = {
  delete: deletUserCard,
  like: addLikeforCard,
  unlike: unLikeCard,
};

const callbacksCard = {
  hasAccesToDel: hasAccesToDel,
  removeCard: removeCard,
  hasLikedCard: hasLikedCard,
  addLike: addLike,
  zoomCardImg: zoomCardImg,
};

//DOM: список карточек
const cardsList = document.querySelector(".places__list");

//DOM: Поп-ап с увеличенным изображением карточки
const imagePopup = document.querySelector(".popup_type_image");
const cardImgPopup = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

//Функция увеличения изображения карточки
function zoomCardImg(cardImg) {
  openPopup(imagePopup);
  cardImgPopup.src = cardImg.src;
  cardImgPopup.alt = cardImg.alt;
  imagePopupCaption.textContent = cardImg.alt;
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
const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.elements["name"];
const jobInput = profileFormElement.elements["description"];

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
  function makeRequest() {
    return addAvatarProfile({ avatar: avatarLink.value }).then(() => {
      profilAvatar.style.backgroundImage = `url(${avatarLink.value})`;
      closePopup(avatarProfilePopup);
      avatarAddForm.reset();
    });
  }
  clearValidation(avatarAddForm, formValidationConfig);
  handleSubmit(makeRequest, evt);
}



// Функция изменения значений полей формы с информацией профиля
function handleProfileFormSubmit(evt) { 
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
  function makeRequest() {
    return editProfile({ name: nameInput.value, about: jobInput.value }).then(
      () => {
        closePopup(profilePopup);
        profileFormElement.reset();
        
      }
    );
  }
  handleSubmit(makeRequest, evt);
}

//Универсальная функция добавления карточки в разметку
function renderCard(dataCard, method = "prepend") {
  const cardElement = createCard(
    dataCard,
    userId,
    callbacksCard,
    requestsForCard
  );
  cardsList[method](cardElement);
}

// Функция добавления новой карточки через форму с вводом названия и ссылки
function handleAddNewCardFormSubmit(evt) {
  function makeRequest() {
    return postNewCard({ name: placeName.value, link: placeLink.value }).then(
      (dataCard) => {
        renderCard(dataCard);
        closePopup(addCardPopup);
        newCardForm.reset();
      }
    );
  }
  clearValidation(addCardPopup, formValidationConfig);
  handleSubmit(makeRequest, evt);
  
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
newCardForm.addEventListener("submit", handleAddNewCardFormSubmit);

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
      renderCard(userCardItem, "append");
    });
  })
  .catch((err) => {
    console.log(err);
  });
