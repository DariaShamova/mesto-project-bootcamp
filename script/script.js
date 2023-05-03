const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach (function (item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardsList = document.querySelector('.elements__list');

  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  // настраиваем like
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });

  // отображаем на странице
  cardsList.append(cardElement);

  // настраиваем удаление
  const trash = cardElement.querySelector('.card__trash');
  trash.addEventListener('click', () => {
    cardElement.remove();
  });

})

// Открытие модальных окон

const openModal = document.querySelectorAll('.open-button'); //нашли триггеры которые должны открывать окно
openModal.forEach(openBtn => { //перебираем триггеры
  const targetPopup = document.getElementById(openBtn.dataset.target); //находим требуемое окно

  openBtn.addEventListener('click', (evt) => { //добавляем событие клик на триггере
    targetPopup.classList.add('popup_opened');

    //добавляем поп-ап для картинки
    const popupImage = targetPopup.querySelector('.popup__image');
    const popupName = targetPopup.querySelector('.popup__name');
    const eventTarget = evt.target;
    popupImage.src = eventTarget.src;
    popupName.textContent = eventTarget.alt;

  })

  const close = targetPopup.querySelectorAll('.popup__close-icon'); //добавляем событие клик на кнопке закрыть
  close.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      targetPopup.classList.remove('popup_opened');
    });
  });

  const save = targetPopup.querySelectorAll('.form__button'); //добавляем событие клик на кнопке закрыть
  save.forEach(formBtn => {
    formBtn.addEventListener('click', () => {
      targetPopup.classList.remove('popup_opened');
    });
  });

  targetPopup.addEventListener('click', (e) => {
    if (e.target === targetPopup) { //проверяем что нажали именно на оверлей, а не глубже
      targetPopup.classList.remove('popup_opened');
    }
  });

})

// Форма профиля

// Находим форму в DOM
const formElementProfile = document.forms['form-profile'];
// Находим поля формы в DOM
const nameInput = formElementProfile.elements['full-name'];
const jobInput = formElementProfile.elements['job-description'];

// Обработчик «отправки» формы

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__bio').textContent = jobInput.value;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmit);

// Форма места

// Находим форму в DOM
const formElementPlace = document.forms['form-place'];

const renderCard = function (title, src) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardsList = document.querySelector('.elements__list');
  title = formElementPlace.elements['title'];
  src = formElementPlace.elements['source'];

  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.card__image').src = src.value;
  cardElement.querySelector('.card__image').alt = title.value;
  cardElement.querySelector('.card__title').textContent = title.value;

  // настраиваем like
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });

  // отображаем на странице
  cardsList.prepend(cardElement);

  // настраиваем удаление
  const trash = cardElement.querySelector('.card__trash');
  trash.addEventListener('click', () => {
    cardElement.remove();
  });

}

// Обработчик «отправки» формы

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  renderCard();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementPlace.addEventListener('submit', handleFormPlaceSubmit);


