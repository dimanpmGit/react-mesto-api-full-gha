const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'));
}

class Api {
  constructor(config) {
    this.url = config.url;
    this.urlForCards = `${this.url}/cards`;
    this.urlForUser = `${this.url}/users/me`;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(this.urlForUser, {
      headers: this.headers
    })
      .then(handleResponse)
  }

  setUserInfo(data) {
    return fetch(
      this.urlForUser,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
      }
    )
      .then(handleResponse)
  }

  getCardsData() {
    return fetch(this.urlForCards, {
      headers: this.headers
    })
      .then(handleResponse)
  }

  createCard(data) {
    return fetch(this.urlForCards, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this.urlForCards}/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(handleResponse)
  }

  likeCard(id) {
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(handleResponse)
  }

  unlikeCard(id) {
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.urlForCards}/${id}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
        .then(handleResponse)
    }
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(handleResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this.urlForUser}/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
      })
      .then(handleResponse)
  }
}

// Конфиг для подключения к серверу
const config = {
  url: 'http://localhost:3001',//'api.mesto.dimanpm.nomoredomains.rocks',//'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,//'795d4992-334e-420a-88f5-63bf4e3c7168',
    'Content-Type': 'application/json'
  }
}

const api = new Api(config);

export default api;