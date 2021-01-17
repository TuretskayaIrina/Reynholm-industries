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
    .catch((err) => {
      return Promise.reject(err.message)
    });
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

// изменить юзера
export const updateUser = (userId, firstName, lastName, birthday, profession, relocation, adress) => {
  return fetch(
    `${api}/users/${userId}/update`,
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        birthday,
        profession,
        relocation,
        adress,
      })
    }
  )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return Promise.reject(err.message)
      });
}

// удалить юзеров по ids
export const deleteUsers = (userIds) => {
  return fetch(
    `${api}/users/deleteMany`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userIds})
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return Promise.reject(err.message)
    });
}
