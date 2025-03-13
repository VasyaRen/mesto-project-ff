import {checkResponse} from "../utils/checkApi.js"

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "7aeb8440-a6af-49a7-a851-94d9f9188864",
    "Content-Type": "application/json",
  },
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Запрос на получение данных о пользователе
export const getUserInfo = () => {
return request(`${apiConfig.baseUrl}/users/me`, { 
  method: "GET",  headers: apiConfig.headers,});
}

// Запрос на получение данных о всех размещенных на сервере карточках
export const getCardList = () => {
  return request(`${apiConfig.baseUrl}/cards`, { method: "GET",  headers: apiConfig.headers,});
}

//Запрос на внесение изменений в профиль
export const editProfile = (newUserData) => {
  return request(`${apiConfig.baseUrl}/users/me`, {
  method: "PATCH",
  headers: apiConfig.headers,
  body: JSON.stringify(newUserData),
});
}

// Запрос на размещение поста на сервере
export const postNewCard = (newCardData) => {
  return request(`${apiConfig.baseUrl}/cards`, {
  method: "POST",
  headers: apiConfig.headers,
  body: JSON.stringify(newCardData),
});
}

// Запрос на изменение аватара профиля
export const addAvatarProfile = (newAvatarData) => {
  return request(`${apiConfig.baseUrl}/users/me/avatar`, {
  method: "PATCH",
  headers: apiConfig.headers,
  body: JSON.stringify(newAvatarData),
});
}

//Запрос на удаление карточки с сервера
export const deletUserCard = (cardId) => {
  return request(`${apiConfig.baseUrl}/cards/${cardId}`, {
  method: "DELETE",
  headers: apiConfig.headers,
});
}

//Запрос на добавление лайка карточке
export const addLikeforCard = (cardId) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
  method: "PUT",
  headers: apiConfig.headers,
});
}

//Запрос на удаление лайка карточки
export const unLikeCard = (cardId) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
  method: "DELETE",
  headers: apiConfig.headers,
});
}