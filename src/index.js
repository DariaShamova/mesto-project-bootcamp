import './styles/index.css'; // импорт главного файла стилей
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { config, enableValidation } from "./components/validate.js";
import {
  getUserInfo,
  getInitialCards,
  updateProfile,
  updateAvatar,
  addNewCard,
  deleteLike,
  putLike, deleteCard
} from "./components/api.js";
import { renderLoading } from "./components/utils.js";


const cardsList = document.querySelector('.elements__list');
const profileBtn = document.querySelector('.profile__edit-button');
const cardBtn = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('#modal-profile');
const cardPopup = document.querySelector('#modal-place');
const picturePopup = document.querySelector('#modal-picture');
const avatarPopup = document.querySelector('#modal-avatar');
const popupImage = picturePopup.querySelector('.popup__image');
const popupName = picturePopup.querySelector('.popup__name');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__avatar');
// Находим форму профиля в DOM
const formElementProfile = document.forms['form-profile'];
const nameInput = formElementProfile.elements['full-name'];
const jobInput = formElementProfile.elements['job-description'];
// Находим форму места в DOM
const formElementPlace = document.forms['form-place'];
const titleInput = formElementPlace.elements['title'];
const srcInput = formElementPlace.elements['source'];
// Находим форму аватара в DOM
const formElementAvatar = document.forms['form-avatar'];
const avatarInput = formElementAvatar.elements['avatar'];
const avatarBtn = document.querySelector('.profile__avatar-wrapper');
const avatarImg = document.querySelector('.profile__avatar');
const popups = document.querySelectorAll('.popup');
export let userId;


const openPopupImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(picturePopup);
}

function onDeleteHandler ({ item, cardElement }) {
  deleteCard(item._id)
    .then(res => {
      cardElement.remove()
    })
    .catch((err) => {
      console.log(err);
    });
}

function onLikeHandler({like, item, cardCounter}) {
  if(like.className.includes('card__like-button_active')) {
    deleteLike(item._id)
      .then((card) => {
        cardCounter.textContent = card.likes.length;
        like.classList.remove('card__like-button_active');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(item._id)
      .then((card) => {
        cardCounter.textContent = card.likes.length;
        like.classList.add('card__like-button_active');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => { // деструктурируем ответ от сервера, чтобы было понятнее, что пришло
    profileName.textContent = userData.name; // установка данных пользователя
    profileBio.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    userId = userData._id;

    cards.forEach(function (item) { // отрисовка карточек
      const cardElement = createCard(item, openPopupImage, onLikeHandler, onDeleteHandler);
      cardsList.append(cardElement);
    })
  })
  .catch((err) => {
    console.log(err);
  });


formElementPlace.addEventListener('submit', handlePlaceForm);
formElementProfile.addEventListener('submit', handleProfileForm);
formElementAvatar.addEventListener('submit', handleAvatarForm);


cardBtn.addEventListener('click', () => openPopup(cardPopup));
profileBtn.addEventListener('click', () =>  {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
});
avatarBtn.addEventListener('click', () => openPopup(avatarPopup));


//Закрытие поп-апа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) { //По клику на overlay
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-icon')) { //По клику на крестик
      closePopup(popup)
    }
  })
})

function handleSubmit(request, evt, loadingText = "Сохранение...") { //универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузкb
  evt.preventDefault(); // всегда нужно предотвращать перезагрузку формы при сабмите

  const submitButton = evt.submitter; // универсально получаем кнопку сабмита из `evt`
  const popup = submitButton.closest('.popup');
  const initialText = submitButton.textContent; // записываем начальный текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => { // любую форму нужно очищать после успешного ответа от сервера
      evt.target.reset();
      closePopup(popup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`); // в каждом запросе нужно ловить ошибку
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

function handleProfileForm(evt) {
  function makeRequest() {
    return updateProfile(nameInput.value, jobInput.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileBio.textContent = userData.about;
      })
  }
  handleSubmit(makeRequest, evt)
}

function handlePlaceForm(evt) {
  const item = {
    name: titleInput.value,
    link: srcInput.value
  };
  function makeRequest() {
    return addNewCard(item.name, item.link)
      .then((item) => {
        const cardElement = createCard(item, openPopupImage, onLikeHandler, onDeleteHandler);
        cardsList.prepend(cardElement);
      })
  }
  handleSubmit(makeRequest, evt)
}

function handleAvatarForm(evt) {
  function makeRequest() {
    return updateAvatar(avatarInput.value)
      .then((user) => {
        avatarImg.src = user.avatar;
      })
  }
  handleSubmit(makeRequest, evt)
}

enableValidation(config);



















