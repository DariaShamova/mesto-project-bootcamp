(()=>{"use strict";function e(e,t){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__like-button"),o=n.querySelector(".card__trash"),c=n.querySelector(".card__image"),a=n.querySelector(".card__title");return c.src=e.link,c.alt=e.name,a.textContent=e.name,r.addEventListener("click",(function(e){e.target.classList.toggle("card__like-button_active")})),o.addEventListener("click",(function(){n.remove()})),c.addEventListener("click",(function(){return t(e.name,e.link)})),n}var t=function(e){"Escape"===e.key&&r(document.querySelector(".popup_opened"))};function n(e){e.classList.add("popup_opened"),document.addEventListener("keydown",t)}function r(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",t)}var o=".form",c=".form__field",a="form__button_inactive",i="hover-button",d="form__field_type_error",s="form__error_active",l=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(a),t.classList.add(i)):(t.classList.add(a),t.classList.remove(i))},u=document.querySelector(".elements__list"),p=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),f=document.querySelector("#modal-profile"),v=document.querySelector("#modal-place"),_=document.querySelector("#modal-picture"),y=_.querySelector(".popup__image"),k=_.querySelector(".popup__name"),L=document.querySelector(".profile__name"),q=document.querySelector(".profile__bio"),S=document.forms["form-profile"],E=S.elements["full-name"],g=S.elements["job-description"],h=document.forms["form-place"],b=h.elements.title,x=h.elements.source,j=document.querySelectorAll(".popup__close-icon"),C=function(e,t){y.src=t,y.alt=e,k.textContent=e,n(_)};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(t){var n=e(t,C);u.append(n)})),h.addEventListener("submit",(function(t){t.preventDefault();var n=e({name:b.value,link:x.value},C);u.prepend(n),r(v),h.reset()})),S.addEventListener("submit",(function(e){e.preventDefault(),L.textContent=E.value,q.textContent=g.value,r(f)})),m.addEventListener("click",(function(){return n(v)})),p.addEventListener("click",(function(){return n(f)})),j.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return r(t)}))})),v.addEventListener("click",(function(e){e.target===v&&r(v)})),f.addEventListener("click",(function(e){e.target===f&&r(f)})),_.addEventListener("click",(function(e){e.target===_&&r(_)})),Array.from(document.querySelectorAll(o)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(c)),n=e.querySelector(".form__button");l(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(d),n.classList.remove(s),n.textContent=""}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(d),r.textContent=n,r.classList.add(s)}(e,t,t.validationMessage)})(e,r),l(t,n)}))}))}(e)}))})();