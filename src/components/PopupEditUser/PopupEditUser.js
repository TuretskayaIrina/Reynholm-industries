import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupEditUser.css';
import avatar from '../../img/no-avatar.png';
import FormValidator from '../../hooks/FormValidator';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function PopupEditUser({ isOpen, onClose, handleEditUser, selectForEdit, setSelectForEdit }) {

  const currentUser = React.useContext(CurrentUserContext);

  // нужно будет вывести текст ошибок errors
  const {values, handleChange} = FormValidator();

  // React.useEffect(() => {
  //   resetForm();
  // }, [ resetForm ]);

  const [ firstName, setFirstName ] = React.useState('');
  const [ lastName, setLastName ] = React.useState('');

  function handleChangeFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleChangeLastName(e) {
    setLastName(e.target.value);
  }

  // подставляем данные при открытии попапа редактирования
  React.useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
  }, [currentUser]);




  // обработчик добавления/редактирования карточки
  function handleSubmit(e) {
    e.preventDefault();
    handleEditUser({
      firstName: firstName,
      lastName: lastName,
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
    title='Редактирование cотрудника'
    children={
      <>
        <div className="popup__form-children">
          <div className="popup__img-container">
            <img className="popup__img" src={avatar || this.state.imgSrc} alt="avatar"></img>
            <div className="popup__select-container">
              <input
                id="editFile"
                className="popup__select-img"
                type="file" name="photo"
                accept="image/*,image/jpeg"
              />
              <label htmlFor="editFile" className="popup__select-img-label">
                <span className="popup__select-img-label-text">Выберите фото</span>
              </label>
            </div>
          </div>
          <div className="popup__inputs">
            <input
              className="popup__input"
              type="text"
              placeholder="Имя"
              autoComplete="off"
              onChange={handleChangeFirstName}
              minLength="2"
              maxLength="30"
              required
              name="firstName"
              value={firstName || ''}
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Город"
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Фамилия"
              autoComplete="off"
              onChange={handleChangeLastName}
              minLength="2"
              maxLength="30"
              required
              name="lastName"
              value={lastName || ''}
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Улица"
            />

            <input
              className="popup__input"
              type="date"
              placeholder="Дата рождения"
              // onChange={handleChange}
              // required
              // name="birthday"
              // value={values.birthday || ''}
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Дом"
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Должность"
              autoComplete="off"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              name="profession"
              value={values.profession || ''}
            />

            <input
              className="popup__input"
              type="number"
              placeholder="Квартира"
            />

            <div className="popup__checkbox-container">
              <input
                className="popup__checkbox"
                type="checkbox"
                name="relocation"
                checked={values.relocation}
              />
              <label className="popup__checkbox-label">Удаленка</label>
            </div>
          </div>
        </div>
        <button
          className="popup__button-save popup__button-save_active"
          type="submit"
        >
          Сохранить
        </button>
      </>
    }
    />
  )
}

export default PopupEditUser;
