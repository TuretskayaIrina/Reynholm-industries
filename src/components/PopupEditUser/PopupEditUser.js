import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupEditUser.css';
import avatar from '../../img/no-avatar.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function PopupEditUser({ isOpen, onClose, handleEditUser, selectForEdit, setSelectForEdit }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ firstName, setFirstName ] = React.useState('');
  const [ lastName, setLastName ] = React.useState('');
  const [ birthday, setBirthday ] = React.useState('');
  const [ profession, setProfession ] = React.useState('');
  const [ relocation, setRelocation ] = React.useState(false);
  const [ city, setCity ] = React.useState('');
  const [ street, setStreet ] = React.useState('');
  const [ home, setHome ] = React.useState('');
  const [ apartment, setApartment ] = React.useState('');


  // обработчики изменений импутов
  function handleChangeFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleChangeLastName(e) {
    setLastName(e.target.value);
  }

  function handleChangeBirthday(e) {
    setBirthday(e.target.value);
  }

  function handleChangeProfession(e) {
    setProfession(e.target.value);
  }

  function handleChangeRelocation(e) {
    setRelocation(e.target.checked);
  }

  function handleChangeCity(e) {
    setCity(e.target.value);
  }

  function handleChangeStreet(e) {
    setStreet(e.target.value);
  }

  function handleChangeHome(e) {
    setHome(e.target.value);
  }

  function handleChangeApartment(e) {
    setApartment(e.target.value);
  }

  // приводим дату рождения в нужный формат
  function handlebirthday(date) {
    const birthday = new Date(date);
    let dd = (birthday.getDate() < 10 ? '0' : '') + birthday.getDate();
    let MM = ((birthday.getMonth() + 1) < 10 ? '0' : '') + (birthday.getMonth() + 1);
    let yyyy = birthday.getFullYear();
    const formatDate = `${yyyy}-${MM}-${dd}`;

    return formatDate;
  }

  // подставляем данные при открытии попапа редактирования
  React.useEffect(() => {
    if (isOpen) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setBirthday(() => handlebirthday(currentUser.birthday));
      setProfession(currentUser.profession);
      setRelocation(currentUser.relocation);
      setCity(currentUser.adress.city);
      setStreet(currentUser.adress.street);
      setHome(currentUser.adress.home);
      setApartment(currentUser.adress.apartment);
    }
  }, [currentUser, currentUser.firstName, currentUser.lastName, currentUser.profession, currentUser.relocation, isOpen]);

  // обработчик добавления/редактирования карточки
  function handleSubmit(e) {
    e.preventDefault();
    handleEditUser({
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      profession: profession,
      relocation: relocation,
      adress: {
        city: city,
        street: street,
        home: home,
        apartment: apartment,
      },
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
              autoComplete="off"
              onChange={handleChangeCity}
              // minLength="2"
              // maxLength="30"
              // required
              name="city"
              value={city || ''}
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
              autoComplete="off"
              onChange={handleChangeStreet}
              // minLength="2"
              // maxLength="30"
              // required
              name="street"
              value={street || ''}
            />

            <input
              className="popup__input"
              type="date"
              placeholder="Дата рождения"
              autoComplete="off"
              onChange={handleChangeBirthday}
              // minLength="2"
              // maxLength="30"
              // required
              name="birthday"
              value={birthday || ''}
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Дом"
              autoComplete="off"
              onChange={handleChangeHome}
              // minLength="2"
              // maxLength="30"
              // required
              name="home"
              value={home || ''}
            />

            <input
              className="popup__input"
              type="text"
              placeholder="Должность"
              autoComplete="off"
              onChange={handleChangeProfession}
              // minLength="2"
              // maxLength="30"
              // required
              name="profession"
              value={profession || ''}
            />

            <input
              className="popup__input"
              type="number"
              placeholder="Квартира"
              autoComplete="off"
              onChange={handleChangeApartment}
              // minLength="2"
              // maxLength="30"
              // required
              name="apartment"
              value={apartment || ''}
            />

            <div className="popup__checkbox-container">
              <input
                className="popup__checkbox"
                type="checkbox"
                onChange={handleChangeRelocation}
                name="relocation"
                checked={relocation || ''}
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
