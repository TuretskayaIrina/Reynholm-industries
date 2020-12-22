import React from 'react';
import './Table.css';
import item from '../../data/data';

function Table() {
  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-item">Превью</th>
          <th className="table__head-item">Имя</th>
          <th className="table__head-item">Фамилия</th>
          <th className="table__head-item">Дата рождения</th>
          <th className="table__head-item">Возвраст</th>
          <th className="table__head-item">Должность</th>
          <th className="table__head-item">Удаленка</th>
          <th className="table__head-item">Адрес проживания</th>
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
