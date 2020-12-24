import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupEdit.css';
import avatar from '../../img/no-avatar.png';

function PopupEdite({ isOpen, onClose, handleEdit }) {

  // обработчик добавления/редактирования карточки
  function handleSubmit(e) {
    e.preventDefault();
    handleEdit();
    console.log('delete');
}

  return(
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name='popup-edit'
    title='Добавление/Редактирование'
    children={
      <>
        <div className="popup__form-children">
          <div className="popup__img-container">
            <img className="popup__img" src={avatar} alt="avatar"></img>
            <div className="popup__select-container">
              <input id="file" className="popup__select-img" type="file" name="photo" accept="image/*,image/jpeg"></input>
              <label for="file" className="popup__select-img-label">
                <span class="popup__select-img-label-text">Выберите фото</span>
              </label>
            </div>
          </div>
          <div className="popup__inputs">
            <input className="popup__input" type="text" placeholder="Имя"/>
            <input className="popup__input" type="text" placeholder="Город"/>
            <input className="popup__input" type="text" placeholder="Фамилия"/>
            <input className="popup__input" type="text" placeholder="Улица"/>
            <input className="popup__input" type="date" placeholder="Дата рождения"/>
            <input className="popup__input" type="text" placeholder="Дом"/>
            <input className="popup__input" type="text" placeholder="Должность"/>
            <input className="popup__input" type="number" placeholder="Квартира"/>
            <div className="popup__checkbox-container">
              <input className="popup__checkbox" type="checkbox"/>
              <label className="popup__checkbox-label">Удаленка</label>
            </div>
          </div>
        </div>
        <button className="popup__button-save popup__button-save_active" type="submit">Сохранить</button>
      </>
    }
    />
  )
}

export default PopupEdite;
