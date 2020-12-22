import './Main.css';
import React from 'react';
import Table from '../Table/Table';


function Main() {
  function handlerClickAdd() {
    console.log('add');
  }

  function handlerClickDelete() {
    console.log('delete');
  }

  function handlerClickEdit() {
    console.log('edit');
  }

  return(
    <section className="main">
      <div className="button__container">
        <button className="button__item" type="button" onClick={handlerClickAdd}>Добавить</button>
        <button className="button__item" type="button" onClick={handlerClickEdit}>Редактировать</button>
        <button className="button__item" type="button" onClick={handlerClickDelete}>Удалить</button>
      </div>
      <Table />
    </section>
  );
}

export default Main;
