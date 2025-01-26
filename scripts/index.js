// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, removeCard) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  cardItem.querySelector(".card__image").src = item.link;
  cardItem.querySelector(".card__image").alt = item.name;
  cardItem.querySelector(".card__title").textContent = item.name;

  const buttonDelete = cardItem.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => removeCard(cardItem));

  return cardItem;
}

// @todo: Функция удаления карточки
function removeCard(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardsList.append(createCard(item, removeCard));
});
