import './styles/index.css'; // импорт главного файла стилей
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { config, enableValidation } from "./components/validate.js";
import { getUserInfo, getInitialCards, updateProfile, updateAvatar, addNewCard } from "./components/api.js";


const cardsList = document.querySelector('.elements__list');
const profileBtn = document.querySelector('.profile__edit-button');
const cardBtn = document.querySelector('.profile__add-button');
const formBtns = document.querySelectorAll('.form__button');
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
const closeBtns = document.querySelectorAll('.popup__close-icon');
export let userId;


const openPopupImage = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(picturePopup);
}

getInitialCards()
  .then((initialCards) => {
    initialCards.forEach(function (item) {
      const cardElement = createCard(item, openPopupImage);
      cardsList.append(cardElement);
    })
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

getUserInfo()
    .then((info) => {
      profileName.textContent = info.name;
      profileBio.textContent = info.about;
      profileAvatar.src = info.avatar;
      userId = info._id;
    })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });


formElementPlace.addEventListener('submit', handlePlaceForm);
formElementProfile.addEventListener('submit', handleProfileForm);
formElementAvatar.addEventListener('submit', handleAvatarForm);


cardBtn.addEventListener('click', () => openPopup(cardPopup));
profileBtn.addEventListener('click', () => openPopup(profilePopup));
avatarBtn.addEventListener('click', () => openPopup(avatarPopup));


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
avatarPopup.addEventListener('click', evt => {
  if (evt.target === avatarPopup) { //проверяем что нажали именно на оверлей, а не глубже
    closePopup(avatarPopup);
  }
});


// Форма профиля
// Обработчик «отправки» формы
function handleProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(true);
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  updateProfile(nameInput.value, jobInput.value)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
      renderLoading(false);
    });
  closePopup(profilePopup);
}

// Форма места
// Обработчик «отправки» формы
function handlePlaceForm(evt) {
  evt.preventDefault();
  renderLoading(true);
  const item = {
    name: titleInput.value,
    link: srcInput.value
  };
  addNewCard(item.name, item.link)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((item) => {
      const cardElement = createCard(item, openPopupImage);
      cardsList.prepend(cardElement);
      renderLoading(false);
    });
  closePopup(cardPopup);
  formElementPlace.reset();
}

// Форма аватара
// Обработчик «отправки» формы
function handleAvatarForm(evt) {
  evt.preventDefault();
  renderLoading(true);
  updateAvatar(avatarInput.value)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((user) => {
      avatarImg.src = user.avatar;
      renderLoading(false);
    });
  closePopup(avatarPopup);
  formElementAvatar.reset();
}

function renderLoading(isLoading) {
  if (isLoading) {
    formBtns.forEach(formBtn => {
      formBtn.textContent = 'Сохранение...'
    });
  }
};

enableValidation(config);

















