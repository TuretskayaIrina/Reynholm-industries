import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupDelete from '../PopupDelete/PopupDelete';
import PopupCreateUser from '../PopupCreateUser/PopupCreateUser';
import PopupEditUser from '../PopupEditUser/PopupEditUser';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as api from '../../utuls/api';

function App() {
  const [ isPopupDeliteOpen, setPopupDeliteOpen ] = React.useState(false);
  const [ isPopupCreateOpen, setPopupCreateOpen] = React.useState(false);
  const [ isPopupEditOpen, setPopupEditOpen ] = React.useState(false);
  const [ users, setUsers ] = React.useState([]);
  const [ selectForDelete, setSelectForDelete ] = React.useState([]);
  const [ currentUser, setCurrentUser ] = React.useState({});

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
    setSelectForDelete([]);;
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

  // обработчик удаления
  function handleDelete() {
    if (selectForDelete.length > 0) {
      // собираем массив id'шников на удаление
      const userIds = [...new Set(selectForDelete.map(e => e._id))];
      api.deleteUsers(userIds)
        .then((res) => {
          console.log(res);
          // нужно обновить стейт для обновленного рендеринга
          setSelectForDelete([]);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    closeAllPopups();
  }

  // обработчик редактирования юзера
  function handleEditUser({firstName, lastName}) {
    api.updateUser(currentUser._id, firstName, lastName)
      .then((res) => {
        console.log(res)
        // нужно обновить стейт для обновленного рендеринга
      })
      .catch((err) => {
        console.log(err);
      })
    closeAllPopups();
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          handleOpenPopupAdd={handleOpenPopupAdd}
          handleOpenPopupEdit={handleOpenPopupEdit}
          handleOpenPopupDelete={handleOpenPopupDelete}
          users={users}
          selectForDelete={selectForDelete}
          setSelectForDelete={setSelectForDelete}
          setCurrentUser={setCurrentUser}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
