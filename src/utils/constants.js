//DOM: список карточек
const cardsList = document.querySelector(".places__list");

//DOM: Поп-ап с увеличенным изображением карточки
const imagePopup = document.querySelector(".popup_type_image");
const cardImgPopup = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");


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
