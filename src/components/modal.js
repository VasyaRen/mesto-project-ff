//Функция открытия поп-апа и добавление слушателей для дальнейшего закрытия по Esc и по клику на оверлей
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("click", closeByClickOnOverlay);
  document.addEventListener("keydown", closeOnEscape);

  
}

//Функция закрытия поп-апа и удаление слушателей
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeByClickOnOverlay);
  document.removeEventListener("keydown", closeOnEscape);

}

//Функция закрытия поп-апа по клику на оверлей
function closeByClickOnOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

//Функция закрытия поп-апа по клику на ESC
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
