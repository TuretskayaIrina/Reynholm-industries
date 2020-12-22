import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupDelete({ isOpen, onClose, handleDelite }) {

  // обработчик отправки удаления карточки
  function handleSubmit(e) {
    e.preventDefault();
    handleDelite();
    console.log('delete');
}

  return(
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name='popup-delite'
    title='Вы уверены?'
    children={
      <>
        <button className="popup__button-save popup__button-save_active" type="submit">Да</button>
      </>
    }
    />
  )
}

export default PopupDelete;
