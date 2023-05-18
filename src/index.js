import './styles/index.css'; // добавьте импорт главного файла стилей

const cardsList = document.querySelector('.elements__list');
const profileBtn = document.querySelector('.profile__edit-button');
const cardBtn = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('#modal-profile');
const cardPopup = document.querySelector('#modal-place');
const picturePopup = document.querySelector('#modal-picture');
const popupImage = picturePopup.querySelector('.popup__image');
const popupName = picturePopup.querySelector('.popup__name');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
// Находим форму профиля в DOM
const formElementProfile = document.forms['form-profile'];
const nameInput = formElementProfile.elements['full-name'];
const jobInput = formElementProfile.elements['job-description'];
// Находим форму места в DOM
const formElementPlace = document.forms['form-place'];
const titleInput = formElementPlace.elements['title'];
const srcInput = formElementPlace.elements['source'];
const closeBtns = document.querySelectorAll('.popup__close-icon');

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

import { createCard } from "./components/card.js";

initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  cardsList.append(cardElement);
})

import { handlePlaceForm, handleProfileForm } from "./components/forms.js";

formElementPlace.addEventListener('submit', handlePlaceForm);
formElementProfile.addEventListener('submit', handleProfileForm);

import { openPopup, closePopup } from "./components/modal.js";

cardBtn.addEventListener('click', () => openPopup(cardPopup));
profileBtn.addEventListener('click', () => openPopup(profilePopup));

//Закрытие поп-апа
//По клику на крестик
closeBtns.forEach(closeBtn => {
  const popup = closeBtn.closest('.popup');
  closeBtn.addEventListener('click', () => closePopup(popup));
});
//По кнопкe ESC
document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    closePopup(cardPopup);
    closePopup(profilePopup);
    closePopup(picturePopup);
  }
});
//По клику на overlay
cardPopup.addEventListener('click', evt => {
  if (evt.target === cardPopup) { //проверяем что нажали именно на оверлей, а не глубже
    closePopup(cardPopup);
  }
});
profilePopup.addEventListener('click', evt => {
  if (evt.target === profilePopup) { //проверяем что нажали именно на оверлей, а не глубже
    closePopup(profilePopup);
  }
});
picturePopup.addEventListener('click', evt => {
  if (evt.target === picturePopup) { //проверяем что нажали именно на оверлей, а не глубже
    closePopup(picturePopup);
  }
});

import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from "./components/validate.js";

enableValidation();





