const api = 'http://localhost:3000';

// получить всех юзеров
export const getAllUsers = () => {
  return fetch(
    `${api}/users`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {return Promise.reject(err.message)});
}

// создать юзера
export const createUser = (user) => {
  return fetch(
    `${api}/users`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // avatar,
        adress: user.adress,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        profession: user.profession,
        relocation: user.relocation,
      })
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {return Promise.reject(err.message)});
}

// удалить юзера
export const deleteUser = (userId) => {
  return fetch(
    `${api}/users/${userId}`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {return Promise.reject(err.message)});
}
