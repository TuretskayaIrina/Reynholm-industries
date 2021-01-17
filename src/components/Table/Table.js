import React from 'react';
import './Table.css';
import avatar from '../../img/no-avatar.png';

function Table({ users, selectForDelete, setSelectForDelete, setCurrentUser }) {

  // переменная состояния в которую буду передавать ключ для сортировки по алфавиту
  // в эту же переменную сохнаняется направление сортировки
  // так смогу использовать одну функцию для всех столбцов таблицы
  const [sortConfig, setSortConfig] = React.useState('');

  const [arrow, setArrow] = React.useState(false);

  // const sorted = users.slice();
  // console.log(sorted)

  let sortedItems = users;
  if (sortConfig !== null){
    sortedItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
      setArrow(false);
    } else {
      direction = 'asc';
      setArrow(true);
    }
    setSortConfig({ key, direction });
  }

  // приводим дату рождения в нужный формат
  function handlebirthday(date) {
    const birthday = new Date(date);
    let dd = (birthday.getDate() < 10 ? '0' : '') + birthday.getDate();
    let MM = ((birthday.getMonth() + 1) < 10 ? '0' : '') + (birthday.getMonth() + 1);
    let yyyy = birthday.getFullYear();
    const formatDate = `${dd}.${MM}.${yyyy} г.`;

    return formatDate;
  }

  // расчет возвраста
  function handleAge(date) {
    const birthday = new Date(date);
    let today = new Date();
    const yearBirthday = `${birthday.getFullYear()}`;
    const yearToday = `${today.getFullYear()}`;
    const age = yearToday - yearBirthday;

    return `${age} лет`;
  }

  // меняем направление стрелки в зависимости от сортировки
  const tableHeadItem = `${arrow ? 'table__head-item table__head-item-sort table__head-item-sort_active' : 'table__head-item table__head-item-sort'}`;

  // проверям, есть ли юзер в массиве выбранных
  function classSelect(arr, val) {
    return arr.some(arrVal => val === arrVal);
  }

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-item">Превью</th>
          <th className={tableHeadItem} onClick={() => requestSort('firstName')}>Имя</th>
          <th className={tableHeadItem} onClick={() => requestSort('lastName')}>Фамилия</th>
          <th className="table__head-item">Дата рождения</th>
          <th className="table__head-item">Возвраст</th>
          <th className={tableHeadItem} onClick={() => requestSort('profession')}>Должность</th>
          <th className="table__head-item">Удаленка</th>
          <th className={tableHeadItem} onClick={() => requestSort('adress')}>Адрес проживания</th>
        </tr>
      </thead>

      {<tbody className="table__body">
        {users.map((user) => (
          <tr
            className={classSelect(selectForDelete, user) ? 'item item-select' : 'item'}
            key={user._id}
            onClick={() => {
              const selected = selectForDelete.some(el => el._id === user._id);
              if ( !selected ) {
                setSelectForDelete([...selectForDelete, user]);
                setCurrentUser(user);
              } else {
                setSelectForDelete(selectForDelete.filter((el) => el._id !== user._id));
                setCurrentUser({});
              }
            }}
          >
            <td className="item__cell">
              <img className="item__img" src={user.photo || avatar} alt={user.firstName} />
            </td>
            <td className="item__cell">{user.firstName}</td>
            <td className="item__cell">{user.lastName}</td>
            <td className="item__cell">{handlebirthday(user.birthday)}</td>
            <td className="item__cell">{handleAge(user.birthday)}</td>
            <td className="item__cell">{user.profession}</td>
            <td className="item__cell item__cell_checkbox">
              <input type="checkbox" defaultChecked={user.relocation}/>
            </td>
            <td className="item__cell">
              Город {user.adress.city},
              улица {user.adress.street},
              дом {user.adress.home},
              кв. {user.adress.apartment}
            </td>
          </tr>
        ))}
      </tbody>}
    </table>
  );
}

export default Table;
