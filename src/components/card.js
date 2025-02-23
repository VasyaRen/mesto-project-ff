// Функция создания карточки с возможностью её увеличить, удалить и лайкнуть
export function createCard(item, removeCard, addLike, zoomCardImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardItem.querySelector(".card__image");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardItem.querySelector(".card__title").textContent = item.name;

  const buttonDelete = cardItem.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => removeCard(cardItem));

  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => addLike(evt));

  cardImg.addEventListener("click", () => zoomCardImg(cardImg));

  return cardItem;
}

// Функция удаления карточки
export function removeCard(cardItem) {
  cardItem.remove();
}

// Функция лайка карточки
export function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
