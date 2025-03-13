// делаем проверку на невалидный инпут
function hasInvalidInput(formInputList) {
  return formInputList.some((formInput) => {
    return !formInput.validity.valid;
  });
}

//изменение состояния кнопки, если найден невалидный инпут(неактивна) и если нет(активна)
function toggleButtonState(formInputList, buttonElement, config) {
  if (hasInvalidInput(formInputList)) {
    disableButtonElement(buttonElement, config);
  } else {
    enableButtonElement(buttonElement, config);
  }
}

//функция деактивации кнопки
function disableButtonElement(buttonElement, config) {
  buttonElement.classList.add(`${config.inactiveButtonClass}`);
  buttonElement.setAttribute("disabled", true);
}
//функция активации кнопки
function enableButtonElement(buttonElement, config) {
  buttonElement.classList.remove(`${config.inactiveButtonClass}`);
  buttonElement.removeAttribute("disabled");
}
//показываем спан об ошибке
function showError(formElement, formInput, config, errorMessage) {
  const formError = formElement.querySelector(
    `.${formInput.name}-input_type_error`
  );
  formError.classList.add(`${config.errorClass}`);
  formError.textContent = errorMessage;
}
//скрываем спан об ошибке и очищаем его поле
function hideError(formElement, formInput, config) {
  const formError = formElement.querySelector(
    `.${formInput.name}-input_type_error`
  );
  formError.classList.remove(`${config.errorClass}`);
  formError.textContent = "";
}

// проверяем на валидность форму, вычисляем текст ошибки
function isValid(formElement, formInput, config) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showError(formElement, formInput, config, formInput.validationMessage);
  } else {
    hideError(formElement, formInput, config);
  }
}

//вешаем проверку на каждый инпут
function setEventlisteners(formElement, config) {
  const formInputList = Array.from(
    formElement.querySelectorAll(`${config.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    `${config.submitButtonSelector}`
  );
  toggleButtonState(formInputList, buttonElement, config);
  formInputList.forEach((formInput) => {
    formInput.addEventListener("input", function () {
      isValid(formElement, formInput, config);
      toggleButtonState(formInputList, buttonElement, config);
    });
  });
}

//запуск проверки на валидность всех форм
export function enableValidation(config) {
  const formList = Array.from(
    document.querySelectorAll(`${config.formSelector}`)
  );
  formList.forEach((formElement) => {
    setEventlisteners(formElement, config);
  });
}

//очистка ошибок валидации
export function clearValidation(formElement, config) {
  const formInputList = Array.from(
    formElement.querySelectorAll(`${config.inputSelector}`)
  );
  formInputList.forEach((input) => {
    hideError(formElement, input, config);
  });
  const buttonElement = formElement.querySelector(
    `${config.submitButtonSelector}`
  );
  disableButtonElement(buttonElement, config);
}
