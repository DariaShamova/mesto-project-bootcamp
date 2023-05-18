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
  const cardElement = createCard(item);
  cardsList.prepend(cardElement);
  closePopup(cardPopup);
  formElementPlace.reset();
}

export { handlePlaceForm, handleProfileForm }
