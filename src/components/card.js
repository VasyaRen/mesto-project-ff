// Функция создания карточки с возможностью её увеличить, удалить и лайкнуть
export function createCard(dataCard, userId, callbacksCard, requestsForCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  cardImg.src = dataCard.link;
  cardImg.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const cardId = dataCard._id; //записываем айди создаваемой карточки

  callbacksCard.hasAccesToDel(
    buttonDelete,
    cardItem,
    cardId,
    userId,
    dataCard,
    callbacksCard,
    requestsForCard
  );

  const likeButton = cardItem.querySelector(".card__like-button");
  const counterLikes = dataCard.likes.length; //получаем кол-во лайков карточки
  const arrLikes = dataCard.likes; //получаем массив лайков карточки
  callbacksCard.hasLikedCard(likeButton, arrLikes, userId);

  likeButton.addEventListener("click", (evt) =>
    addLike(evt, cardId, cardItemLikes, counterLikes, requestsForCard)
  );
  const cardItemLikes = cardItem.querySelector(".like-counter");
  cardItemLikes.textContent = counterLikes; //выводим имеющееся на момент отрисовки карточки кол-во лайков

  cardImg.addEventListener("click", () => callbacksCard.zoomCardImg(cardImg));

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
  dataCard,
  callbacksCard,
  requestsForCard
) {
  if (userId !== dataCard.owner._id) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", () =>
      callbacksCard.removeCard(cardItem, cardId, requestsForCard)
    );
  }
}

// Функция удаления карточки
export function removeCard(cardItem, cardId, requestsForCard) {
  requestsForCard
    .delete(cardId)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция лайка-дизлайка карточки
export function addLike(
  evt,
  cardId,
  cardItemLikes,
  counterLikes,
  requestsForCard
) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    // проверяем, есть ли уже лайк
    requestsForCard
      .unlike(cardId) //если есть - клик уберёт лайк
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        counterLikes = res.likes.length; // получаем акутальное число лайков
        cardItemLikes.textContent = counterLikes;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    requestsForCard
      .like(cardId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active"); // если нет - добавит лайк
        counterLikes = res.likes.length; // получаем акутальное число лайков
        cardItemLikes.textContent = counterLikes;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
