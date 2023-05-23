import { userId } from "../index.js";
import { deleteCard, putLike, deleteLike } from "./api.js";

// создаем новую карточку
function createCard(item, handleClick) {

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



  // настраиваем like
  if(item.likes.find(like => like._id === userId)) {
    like.classList.add('card__like-button_active');
    like.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.remove('card__like-button_active');

      deleteLike(item._id)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((card) => {
          cardCounter.textContent = card.likes.length;
        })
    });

  } else {
    like.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('card__like-button_active');

      putLike(item._id)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((card) => {
          cardCounter.textContent = card.likes.length;
        })
    });
  }


  // настраиваем удаление
  if(item.owner._id !== userId) {
    trash.remove();
  } else {
    trash.addEventListener('click', () => {
      cardElement.remove();
      deleteCard(item._id)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    });
  }


  // настраиваем поп-ап картинки
  cardImage.addEventListener('click', () => handleClick(item.name, item.link));

  return cardElement;
}

export { createCard }
