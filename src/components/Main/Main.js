import './Main.css';
import React from 'react';
import Table from '../Table/Table';


function Main({ handleOpenPopupAdd, handleOpenPopupEdit, handleOpenPopupDelete }) {

  return(
    <section className="main">
      <div className="button__container">
        <button className="button__item" type="button" onClick={handleOpenPopupAdd}>Добавить</button>
        <button className="button__item" type="button" onClick={handleOpenPopupEdit}>Редактировать</button>
        <button className="button__item" type="button" onClick={handleOpenPopupDelete}>Удалить</button>
      </div>
      <Table />
    </section>
  );
}

export default Main;
