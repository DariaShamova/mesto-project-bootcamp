(()=>{"use strict";function e(e){e.classList.add("popup_opened")}function t(e){e.classList.remove("popup_opened")}var n=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("form__button_inactive"),t.classList.add("hover-button")):(t.classList.add("form__button_inactive"),t.classList.remove("hover-button"))},r=document.querySelector(".elements__list"),o=document.querySelector(".profile__edit-button"),c=document.querySelector(".profile__add-button"),a=document.querySelector("#modal-profile"),i=document.querySelector("#modal-place"),l=document.querySelector("#modal-picture"),u=(l.querySelector(".popup__image"),l.querySelector(".popup__name"),document.querySelector(".profile__name"),document.querySelector(".profile__bio"),document.forms["form-profile"]),s=(u.elements["full-name"],u.elements["job-description"],document.forms["form-place"]),d=(s.elements.title,s.elements.source,document.querySelectorAll(".popup__close-icon"));[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=function(e){var t=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),n=t.querySelector(".card__like-button"),r=t.querySelector(".card__trash"),o=t.querySelector(".card__image"),c=t.querySelector(".card__title");return o.src=e.link,o.alt=e.name,c.textContent=e.name,n.addEventListener("click",(function(e){e.target.classList.toggle("card__like-button_active")})),r.addEventListener("click",(function(){t.remove()})),o.addEventListener("click",(function(){popupImage.src=o.src,popupImage.alt=o.alt,popupName.textContent=o.alt,openPopup(picturePopup)})),t}(e);r.append(t)})),s.addEventListener("submit",(function(e){e.preventDefault();var t={name:titleInput.value,link:srcInput.value},n=createCard(t);cardsList.prepend(n),closePopup(cardPopup),formElementPlace.reset()})),u.addEventListener("submit",(function(e){e.preventDefault(),profileName.textContent=nameInput.value,profileBio.textContent=jobInput.value,closePopup(profilePopup)})),c.addEventListener("click",(function(){return e(i)})),o.addEventListener("click",(function(){return e(a)})),d.forEach((function(e){var n=e.closest(".popup");e.addEventListener("click",(function(){return t(n)}))})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&(t(i),t(a),t(l))})),i.addEventListener("click",(function(e){e.target===i&&t(i)})),a.addEventListener("click",(function(e){e.target===a&&t(a)})),l.addEventListener("click",(function(e){e.target===l&&t(l)})),Array.from(document.querySelectorAll(".form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(".form__field")),r=e.querySelector(".form__button");n(t,r),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("form__field_type_error"),n.classList.remove("form__error_active"),n.textContent=""}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("form__field_type_error"),r.textContent=n,r.classList.add("form__error_active")}(e,t,t.validationMessage)}(e,o),n(t,r)}))}))}(e)}))})();