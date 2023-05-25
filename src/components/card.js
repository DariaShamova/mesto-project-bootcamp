import { userId } from "../index.js";
import { deleteCard } from "./api.js";

// создаем новую карточку
function createCard(item, onImageHandler, onLikeHandler, onDeleteHandler) {

  const cardTemplate = document.querySelector('#card-template').content;
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const like = cardElement.querySelector('.card__like-button');
  const trash = cardElement.querySelector('.card__trash');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardCounter = cardElement.querySelector('.card__like-counter');

  // наполняем содержимым
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardCounter.textContent = item.likes.length;

  if(item.likes.find(like => like._id === userId)) {
    like.classList.add('card__like-button_active');
  }

  // настраиваем like
    like.addEventListener('click', function (evt) {
      onLikeHandler({
        evt,
        like,
        item,
        cardCounter
      })
    });

  // настраиваем удаление
  if(item.owner._id !== userId) {
    trash.remove();
  } else {
    trash.addEventListener('click', (evt) => {
      onDeleteHandler ({
        item,
        cardElement })
    })
  }

  // настраиваем поп-ап картинки
  cardImage.addEventListener('click', () => onImageHandler(item.name, item.link));

  return cardElement;
}

export { createCard }
