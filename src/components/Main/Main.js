import './Main.css';
import React from 'react';
import Table from '../Table/Table';


function Main({ handlerAdd, handlerEdit, handlerDelete }) {

  return(
    <section className="main">
      <div className="button__container">
        <button className="button__item" type="button" onClick={handlerAdd}>Добавить</button>
        <button className="button__item" type="button" onClick={handlerEdit}>Редактировать</button>
        <button className="button__item" type="button" onClick={handlerDelete}>Удалить</button>
      </div>
      <Table />
    </section>
  );
}

export default Main;
