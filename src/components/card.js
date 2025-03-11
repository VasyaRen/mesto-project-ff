// Функция создания карточки с возможностью её увеличить, удалить и лайкнуть
export function createCard(
  item,
  userId,
  hasAccesToDel,
  removeCard,
  hasLikedCard,
  addLike,
  zoomCardImg,
  apiforCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardItem.querySelector(".card__image");
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardItem.querySelector(".card__title").textContent = item.name;

  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const cardId = item._id; //записываем айди создаваемой карточки
  hasAccesToDel(
    buttonDelete,
    cardItem,
    cardId,
    userId,
    item,
    removeCard,
    apiforCard
  );

  const likeButton = cardItem.querySelector(".card__like-button");
  const counterLikes = item.likes.length; //получаем кол-во лайков карточки
  const itemLikes = item.likes; //получаем массив лайков карточки
  hasLikedCard(likeButton, itemLikes, userId);

  likeButton.addEventListener("click", (evt) =>
    addLike(evt, cardId, cardItem, counterLikes, apiforCard)
  );
  cardItem.querySelector(".like-counter").textContent = counterLikes; //выводим имеющееся на момент отрисовки карточки кол-во лайков

  cardImg.addEventListener("click", () => zoomCardImg(cardImg));

  return cardItem;
}

//Уточняем наличие лайка пользователя и, если есть, помечаем карточку как лайкнутую
export function hasLikedCard(likeButton, itemLikes, userId) {
  itemLikes.some((userLike) => {
    //перебираем в поисках лайка, который поставил наш пользователь
    if (userId === userLike._id) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
}

//Функция определения наличия доступ к удалению: если айди совпадают, то иконка удаляется, иначе - вешается слушатель
export function hasAccesToDel(
  buttonDelete,
  cardItem,
  cardId,
  userId,
  item,
  removeCard,
  apiforCard
) {
  if (userId !== item.owner._id) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", () =>
      removeCard(cardItem, cardId, apiforCard)
    );
  }
}

// Функция удаления карточки
export function removeCard(cardItem, cardId, apiforCard) {
  apiforCard
    .delete(cardId)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция лайка-дизлайка карточки
export function addLike(evt, cardId, cardItem, counterLikes, apiforCard) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    // проверяем, есть ли уже лайк
    apiforCard
      .unlike(cardId) //если есть - клик уберёт лайк
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        counterLikes = res.likes.length; // получаем акутальное число лайков
        cardItem.querySelector(".like-counter").textContent = counterLikes;
      });
  } else {
    evt.target.classList.add("card__like-button_is-active"); // если нет - добавит лайк
    apiforCard
      .like(cardId)
      .then((res) => {
        counterLikes = res.likes.length; // получаем акутальное число лайков
        cardItem.querySelector(".like-counter").textContent = counterLikes;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
