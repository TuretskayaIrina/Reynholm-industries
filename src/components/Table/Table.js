import React from 'react';
import './Table.css';
import item from '../../data/data';

function Table() {

  function sortName() {
    console.log('sortName');
    item.sort(function (a, b) {
      if (a.firstName > b.firstName) {
        return 1;
      }
      if (a.firstName < b.firstName) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
    console.log(item);
    // console.log(item.reverse());
  }

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-item">Превью</th>
          <th className="table__head-item table__head-item-sort" onClick={sortName}>Имя</th>
          <th className="table__head-item table__head-item-sort">Фамилия</th>
          <th className="table__head-item table__head-item-sort">Дата рождения</th>
          <th className="table__head-item table__head-item-sort">Возвраст</th>
          <th className="table__head-item table__head-item-sort">Должность</th>
          <th className="table__head-item table__head-item-sort">Удаленка</th>
          <th className="table__head-item table__head-item-sort">Адрес проживания</th>
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
