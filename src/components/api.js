const settings = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-8',
  headers: {
    authorization: '44aacbb9-bcfb-4baf-9b17-25c42a7ed485',
    'Content-Type': 'application/json'
  }
}

export const getUserInfo = () => {
  return fetch(`${settings.baseUrl}/users/me`, {
    headers: settings.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};
export const getInitialCards = () => {
  return fetch(`${settings.baseUrl}/cards`, {
    headers: settings.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const updateProfile = (profileName, profileAbout) => {
  return fetch(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
}

export const updateAvatar = (avatarSrc) => {
  return fetch(`${settings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar: avatarSrc
    })
  })
}

export const addNewCard = (cardName, cardSource) => {
  return fetch(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardSource
    })
  })
}

export const deleteCard = (cardId) => {
  return fetch(`${settings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
}

export const putLike = (cardId) => {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settings.headers,
  })
}

export const deleteLike = (cardId) => {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
}



