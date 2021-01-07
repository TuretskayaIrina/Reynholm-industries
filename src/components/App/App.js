import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupDelete from '../PopupDelete/PopupDelete';
import PopupCreateUser from '../PopupCreateUser/PopupCreateUser';
import PopupEditUser from '../PopupEditUser/PopupEditUser';
import * as api from '../../utuls/api';

function App() {
  const [ isPopupDeliteOpen, setPopupDeliteOpen ] = React.useState(false);
  const [ isPopupCreateOpen, setPopupCreateOpen] = React.useState(false);
  const [ isPopupEditOpen, setPopupEditOpen ] = React.useState(false);
  const [ users, setUsers ] = React.useState([]);

  // получить список сотрудников при монтировании app
  React.useEffect(() => {
    api.getAllUsers()
      .then((res) => {
        setUsers(res)
      })
      .catch((err) => {
        console.log(err);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenPopupAdd() {
    setPopupCreateOpen(true);
    console.log('add');
  }

  function handleOpenPopupEdit() {
    setPopupEditOpen(true);
    console.log('edit');
  }

  function handleOpenPopupDelete() {
    setPopupDeliteOpen(true);
    console.log('delete');
  }

  // закрытие всех модальных окон
  function closeAllPopups() {
    setPopupDeliteOpen(false);
    setPopupEditOpen(false);
    setPopupCreateOpen(false);
    setSelectForDelete([]);
    setSelectForEdit({});
  }

  // закрыть на Esc
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  // закрыть на overlay
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  // слушатели для закрытия на esc и overlay
  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handleOverlayClose);

    return () => {
      window.removeEventListener('keydown', handleEscClose);
      window.removeEventListener('mousedown', handleOverlayClose);
    };
  })

  // обработчик добавления юзера
  function handleCreateUser({firstName, lastName, birthday, profession, relocation, adress}) {
    api.createUser({firstName, lastName, birthday, profession, relocation, adress})
      .then((newUser) => {
        setUsers([newUser, ...users]);
        console.log(newUser);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // переменная выбора юзеров на удаление
  const [ selectForDelete, setSelectForDelete ] = React.useState([]);

  console.log(selectForDelete);

  // обработчик удаления
  function handleDelete() {
    if (selectForDelete.length > 0) {
      // делаем массив юзеров для удаления с уникальными значениями
      const myArray = selectForDelete.map(i => i);
      const uniqArr = [...new Set(myArray)];

      uniqArr.forEach((userDelete) => {
        api.deleteUser(userDelete._id)
          .then(() => {
            setUsers(users.filter((i) => i._id !== userDelete._id));
            setSelectForDelete([]);
            // closeAllPopups();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    closeAllPopups();
  }

  // переменная для редактирования юзера
  const [ selectForEdit, setSelectForEdit ] = React.useState({});
  // console.log(selectForEdit);

  function handleEditUser() {
    console.log('handleEditUser');
  }

  return (
    <div className="App">
      <Header />
      <Main
        handleOpenPopupAdd={handleOpenPopupAdd}
        handleOpenPopupEdit={handleOpenPopupEdit}
        handleOpenPopupDelete={handleOpenPopupDelete}
        users={users}
        selectForDelete={selectForDelete}
        setSelectForDelete={setSelectForDelete}
        selectForEdit={selectForEdit}
        setSelectForEdit={setSelectForEdit}
      />
      <Footer />
      <PopupDelete
        isOpen={isPopupDeliteOpen}
        onClose={closeAllPopups}
        handleDelete={handleDelete}
      />
      <PopupCreateUser
        isOpen={isPopupCreateOpen}
        onClose={closeAllPopups}
        handleCreateUser={handleCreateUser}
      />
      <PopupEditUser
        isOpen={isPopupEditOpen}
        onClose={closeAllPopups}
        handleEditUser={handleEditUser}
      />
    </div>
  );
}

export default App;
