import './styles/index.css'; // добавьте импорт главного файла стилей
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { config, enableValidation } from "./components/validate.js";
import { initialCards } from "./components/initial-cards.js";


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



const openPopupImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(picturePopup);
}

initialCards.forEach(function (item) {
  const cardElement = createCard(item, openPopupImage);
  cardsList.append(cardElement);
})


formElementPlace.addEventListener('submit', handlePlaceForm);
formElementProfile.addEventListener('submit', handleProfileForm);


cardBtn.addEventListener('click', () => openPopup(cardPopup));
profileBtn.addEventListener('click', () => openPopup(profilePopup));


//Закрытие поп-апа
//По клику на крестик
closeBtns.forEach(closeBtn => {
  const popup = closeBtn.closest('.popup');
  closeBtn.addEventListener('click', () => closePopup(popup));
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

// Форма профиля
// Обработчик «отправки» формы
function handleProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Форма места
// Обработчик «отправки» формы
function handlePlaceForm(evt) {
  evt.preventDefault();
  const item = {
    name: titleInput.value,
    link: srcInput.value
  };
  const cardElement = createCard(item, openPopupImage);
  cardsList.prepend(cardElement);
  closePopup(cardPopup);
  formElementPlace.reset();
}

enableValidation(config);






