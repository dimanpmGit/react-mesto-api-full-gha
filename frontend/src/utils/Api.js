const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Произошла ошибка'));
}

class Api {
  constructor() {
    this.url = config.url;
    this.urlForCards = `${this.url}/cards`;
    this.urlForUser = `${this.url}/users/me`;
  }

  getUserInfo() {
    return fetch(this.urlForUser, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }

  setUserInfo(data) {
    return fetch(
      this.urlForUser,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then(handleResponse)
  }

  getCardsData() {
    return fetch(this.urlForCards, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }

  createCard(data) {
    return fetch(this.urlForCards, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this.urlForCards}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }

  likeCard(id) {
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }

  unlikeCard(id) {
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.urlForCards}/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
        .then(handleResponse)
    }
    return fetch(`${this.urlForCards}/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this.urlForUser}/avatar`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(handleResponse)
  }
}

// Конфиг для подключения к серверу
const config = {
  url: 'https://api.mesto.dimanpm.nomoredomains.rocks'
}

const api = new Api(config);

export default api;