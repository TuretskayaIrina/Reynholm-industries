import './Main.css';
import React from 'react';
import Table from '../Table/Table';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ handleOpenPopupAdd, handleOpenPopupEdit, handleOpenPopupDelete, users, selectForDelete, setSelectForDelete, setCurrentUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
    <section className="main">
      <div className="button__container">
        <button
          className="button__item button__item_active"
          type="button"
          onClick={handleOpenPopupAdd}
        >
          Добавить
        </button>

        <button
          className={currentUser._id === undefined ? 'button__item button__item_disable' : 'button__item button__item_active'}
          type="button"
          onClick={handleOpenPopupEdit}
          disabled={currentUser._id === undefined}
        >
          Редактировать
        </button>

        <button
          className={selectForDelete.length === 0 ? 'button__item button__item_disable' : 'button__item button__item_active'}
          type="button"
          onClick={handleOpenPopupDelete}
          disabled={selectForDelete.length === 0}
        >
          Удалить
        </button>
      </div>
      <Table
        users={users}
        selectForDelete={selectForDelete}
        setSelectForDelete={setSelectForDelete}
        setCurrentUser={setCurrentUser}
      />
    </section>
  );
}

export default Main;
