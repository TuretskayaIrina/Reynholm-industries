import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupEdit.css';
import avatar from '../../img/no-avatar.png';
import FormValidator from '../../hooks/FormValidator';

function PopupEdite({ isOpen, onClose, handleEdit }) {

  // нужно будет вывести текст ошибок errors
  const {values, handleChange, isValid} = FormValidator();

  // React.useEffect(() => {
  //   resetForm();
  // }, [ resetForm ]);

  // очистить поля при открытии попапа
  React.useEffect(() => {
    firstName.current.value = '';
    lastName.current.value = '';
    birthday.current.value = '';
    profession.current.value = '';
  }, [isOpen]);

  const firstName = React.useRef();
  const lastName = React.useRef();
  const birthday = React.useRef();
  const profession = React.useRef();

  // обработчик добавления/редактирования карточки
  function handleSubmit(e) {
    e.preventDefault();
    handleEdit({
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      birthday: birthday.current.value,
      profession: profession.current.value,
    });
  }

  // обработчик выбора файла
  function handleSelect() {
    let inputs = document.querySelectorAll('.popup__select-img');
    Array.prototype.forEach.call(inputs, function(input) {
      let label = input.nextElementSibling,
      labelVal = label.querySelector('.popup__select-img-label-text').innerText;

      input.addEventListener('change', function (e) {
        let countFiles = '';
          if (this.files && this.files.length >= 1) {
            countFiles = this.files.length;
          }

          if (countFiles){
            label.querySelector('.popup__select-img-label-text').innerText = 'Выбрано файлов: ' + countFiles;
          } else {
            label.querySelector('.popup__select-img-label-text').innerText = labelVal;
          }
      });
    })
  };

  handleSelect();

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
            <img className="popup__img" src={avatar || this.state.imgSrc} alt="avatar"></img>
            <div className="popup__select-container">
              <input
                id="file"
                className="popup__select-img"
                type="file" name="photo"
                accept="image/*,image/jpeg"
              />
              <label htmlFor="file" className="popup__select-img-label">
                <span className="popup__select-img-label-text">Выберите фото</span>
              </label>
            </div>
          </div>
          <div className="popup__inputs">
            <input
              ref={firstName}
              className="popup__input"
              type="text"
              placeholder="Имя"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              name="firstName"
              value={values.firstName || ''}
            />
            <input className="popup__input" type="text" placeholder="Город"/>
            <input
              ref={lastName}
              className="popup__input"
              type="text"
              placeholder="Фамилия"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              name="lastName"
              value={values.lastName || ''}
            />
            <input className="popup__input" type="text" placeholder="Улица"/>
            <input
              ref={birthday}
              className="popup__input"
              type="date"
              placeholder="Дата рождения"
              onChange={handleChange}
              required
              name="birthday"
              value={values.birthday || ''}
            />
            <input className="popup__input" type="text" placeholder="Дом"/>
            <input
              ref={profession}
              className="popup__input"
              type="text"
              placeholder="Должность"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              name="profession"
              value={values.profession || ''}
            />
            <input className="popup__input" type="number" placeholder="Квартира"/>
            <div className="popup__checkbox-container">
              <input className="popup__checkbox" type="checkbox"/>
              <label className="popup__checkbox-label">Удаленка</label>
            </div>
          </div>
        </div>
        <button
          className={ isValid ? "popup__button-save popup__button-save_active" : "popup__button-save popup__button-save_disabled"}
          disabled={!isValid}
          type="submit"
        >
          Сохранить
        </button>
      </>
    }
    />
  )
}

export default PopupEdite;
