import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupDelete from '../PopupDelete/PopupDelete';
import PopupEdite from '../PopupEdit/PopupEdit';

function App() {
  const [ isPopupDeliteOpen, setPopupDeliteOpen ] = React.useState(false);
  const [ isPopupEditOpen, setPopupEditOpen ] = React.useState(false);

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
  function handleEdit() {
    closeAllPopups()
  }

  return (
    <div className="App">
      <Header />
      <Main
        handleOpenPopupAdd={handleOpenPopupAdd}
        handleOpenPopupEdit={handleOpenPopupEdit}
        handleOpenPopupDelete={handleOpenPopupDelete}
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
