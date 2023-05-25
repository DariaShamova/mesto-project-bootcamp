import { checkResponse } from "./utils.js";

const settings = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-8',
  headers: {
    authorization: '44aacbb9-bcfb-4baf-9b17-25c42a7ed485',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(`${settings.baseUrl}/${url}`, options)
    .then(checkResponse)
}

export const getUserInfo = () => {
  return request(`users/me`, {
    headers: settings.headers
  })
}

export const getInitialCards = () => {
  return request(`cards`, {
    headers: settings.headers
  })
}

export const updateProfile = (profileName, profileAbout) => {
  return request(`users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
}

export const updateAvatar = (avatarSrc) => {
  return request(`users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar: avatarSrc
    })
  })
}

export const addNewCard = (cardName, cardSource) => {
  return request(`cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardSource
    })
  })
}

export const deleteCard = (cardId) => {
  return request(`cards/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
}

export const putLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settings.headers,
  })
}

export const deleteLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
}
