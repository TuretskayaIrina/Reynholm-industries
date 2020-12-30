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
