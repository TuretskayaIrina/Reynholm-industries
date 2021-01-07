import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupCreateUser.css';
import avatar from '../../img/no-avatar.png';
import FormValidator from '../../hooks/FormValidator';

function PopupCreateUser({ isOpen, onClose, handleCreateUser }) {

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
    relocation.current.checked = false;
    city.current.value = '';
    street.current.value = '';
    home.current.value = '';
    apartment.current.value = '';

  }, [isOpen]);

  const firstName = React.useRef();
  const lastName = React.useRef();
  const birthday = React.useRef();
  const profession = React.useRef();
  const relocation = React.useRef();
  const city = React.useRef();
  const street = React.useRef();
  const home = React.useRef();
  const apartment = React.useRef();

  // обработчик добавления карточки
  function handleSubmit(e) {
    e.preventDefault();
    handleCreateUser({
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      birthday: birthday.current.value,
      profession: profession.current.value,
      relocation: relocation.current.checked,
      adress: `Город ${city.current.value}, ул. ${street.current.value}, дом ${home.current.value}, кв ${apartment.current.value}`,
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
    title='Добавление cотрудника'
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
              autoComplete="off"
              placeholder="Имя"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              name="firstName"
              value={values.firstName || ''}
            />

            <input
              className="popup__input"
              type="text"
              autoComplete="off"
              placeholder="Город"
              onChange={handleChange}
              ref={city}
              name="city"
              value={values.city}
            />

            <input
              ref={lastName}
              className="popup__input"
              type="text"
              autoComplete="off"
              placeholder="Фамилия"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              name="lastName"
              value={values.lastName || ''}
            />

            <input
              className="popup__input"
              type="text"
              autoComplete="off"
              placeholder="Улица"
              onChange={handleChange}
              name="street"
              value={values.street}
              ref={street}
            />

            <input
              ref={birthday}
              className="popup__input"
              type="date"
              autoComplete="off"
              placeholder="Дата рождения"
              onChange={handleChange}
              required
              name="birthday"
              value={values.birthday || ''}
            />

            <input
              className="popup__input"
              type="text"
              autoComplete="off"
              placeholder="Дом"
              onChange={handleChange}
              name="home"
              valeu={values.home}
              ref={home}
            />

            <input
              ref={profession}
              className="popup__input"
              type="text"
              autoComplete="off"
              placeholder="Должность"
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
              autoComplete="off"
              placeholder="Квартира"
              onChange={handleChange}
              name="apartment"
              valeu={values.apartment}
              ref={apartment}
            />

            <div className="popup__checkbox-container">
              <input
                ref={relocation}
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

export default PopupCreateUser;
