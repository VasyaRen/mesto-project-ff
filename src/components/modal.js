//Функция открытия поп-апа и добавление слушателей для дальнейшего закрытия по Esc и по клику на оверлей
import { popups } from "../index.js";

export function openPopup(pop) {
  pop.classList.toggle("popup_is-opened");
  document.addEventListener("click", closeByClickOnOverlay);
  document.addEventListener("keydown", closeOnEscape);
}

//Функция закрытия поп-апа
export function closePopup() {
  popups.forEach(function (item) {
    if (item.classList.contains("popup_is-opened")) {
      item.classList.remove("popup_is-opened");
    }
  });
}

//Функция закрытия поп-апа по клику на оверлей
function closeByClickOnOverlay(evt) {
  popups.forEach(function (item) {
    if (evt.target === item) {
      closePopup();
    }
  });
}

//Функция закрытия поп-апа по клику на ESC и удаленее слушателя
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
    document.removeEventListener("keydown", closeOnEscape);
  }
}
