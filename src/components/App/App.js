import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupDelete from '../PopupDelete/PopupDelete';
import PopupEdite from '../PopupEdit/PopupEdit';
import * as api from '../../utuls/api';

function App() {
  const [ isPopupDeliteOpen, setPopupDeliteOpen ] = React.useState(false);
  const [ isPopupEditOpen, setPopupEditOpen ] = React.useState(false);
  const [ users, setUsers ] = React.useState([]);

  // получить список сотрудников при монтировании app
  React.useEffect(() => {
    api.getAllUsers()
      .then((res) => {
        console.log(res);
        setUsers(res)
      })
      .catch((err) => {
        console.log(err);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenPopupAdd() {
    setPopupEditOpen(true)
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

  // обработчик удаления
  function handleDelete() {
    closeAllPopups();
  }

  // обработчик редактирования/добавления
  function handleEdit({firstName, lastName, birthday, profession}) {
    api.createUser({firstName, lastName, birthday, profession})
      .then((newUser) => {
        setUsers([newUser, ...users]);
        console.log(newUser);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <Header />
      <Main
        handleOpenPopupAdd={handleOpenPopupAdd}
        handleOpenPopupEdit={handleOpenPopupEdit}
        handleOpenPopupDelete={handleOpenPopupDelete}
        users={users}
      />
      <Footer />
      <PopupDelete
        isOpen={isPopupDeliteOpen}
        onClose={closeAllPopups}
        handleDelete={handleDelete}
      />
      <PopupEdite
        isOpen={isPopupEditOpen}
        onClose={closeAllPopups}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
