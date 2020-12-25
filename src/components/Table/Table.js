import React from 'react';
import './Table.css';
import item from '../../data/data';

function Table() {

  // переменная состояния в которую буду передавать ключ для сортировки
  // в эту же переменную сохнаняется направление сортировки
  // так смогу использовать одну функцию для всех столбцов таблицы
  const [sortConfig, setSortConfig] = React.useState('');
  const [arrow, setArrow] = React.useState(false);

  const sorted = item.slice();
  console.log(sorted)

  let sortedItems = item;
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

  // table__head-item-sort_active
  const tableHeadItem = `${arrow ? 'table__head-item table__head-item-sort table__head-item-sort_active' : 'table__head-item table__head-item-sort'}`;
  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-item">Превью</th>
          <th className={tableHeadItem} onClick={() => requestSort('firstName')}>Имя</th>
          <th className={tableHeadItem} onClick={() => requestSort('lastName')}>Фамилия</th>
          <th className="table__head-item table__head-item-sort">Дата рождения</th>
          <th className="table__head-item table__head-item-sort">Возвраст</th>
          <th className={tableHeadItem} onClick={() => requestSort('profession')}>Должность</th>
          <th className="table__head-item table__head-item-sort">Удаленка</th>
          <th className={tableHeadItem} onClick={() => requestSort('adress')}>Адрес проживания</th>
        </tr>
      </thead>

      {<tbody className="table__body">
        {item.map(item => (
          <tr className="item" key={item.firstName}>
            <td className="item__cell">
              <img className="item__img" src={item.photo} alt={item.firstName} />
            </td>
            <td className="item__cell">{item.firstName}</td>
            <td className="item__cell">{item.lastName}</td>
            <td className="item__cell">{item.birthday}</td>
            <td className="item__cell">{item.age}</td>
            <td className="item__cell">{item.profession}</td>
            <td className="item__cell item__cell_checkbox">
              <input type="checkbox" />
            </td>
            <td className="item__cell">{item.adress}</td>
          </tr>
        ))}
      </tbody>}
    </table>
  );
}

export default Table;
