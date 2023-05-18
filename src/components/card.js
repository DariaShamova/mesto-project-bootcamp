// создаем новую карточку
function createCard(item) {

  const cardTemplate = document.querySelector('#card-template').content;
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const like = cardElement.querySelector('.card__like-button');
  const trash = cardElement.querySelector('.card__trash');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  // наполняем содержимым
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  // настраиваем like
  like.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });

  // настраиваем удаление
  trash.addEventListener('click', () => {
    cardElement.remove();
  });

  // настраиваем поп-ап картинки
  cardImage.addEventListener('click', () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupName.textContent = cardImage.alt;
    openPopup(picturePopup);
  });

  return cardElement;
}

export { createCard }
