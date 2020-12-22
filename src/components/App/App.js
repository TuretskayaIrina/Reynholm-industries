import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupDelete from '../PopupDelete/PopupDelete';

function App() {
  const [ isPopupDeliteOpen, setPopupDeliteOpen] = React.useState(false);

  function handlerAdd() {
    console.log('add');
  }

  function handlerEdit() {
    console.log('edit');
  }

  function handlerDelete() {
    setPopupDeliteOpen(true);
    console.log('delete');
  }

  function closeAllPopups() {
    setPopupDeliteOpen(false);
  }

  function handleDelite() {
    closeAllPopups();
  }

  return (
    <div div className="App">
      <Header />
      <Main
        handlerAdd={handlerAdd}
        handlerEdit={handlerEdit}
        handlerDelete={handlerDelete}
      />
      <Footer />
      <PopupDelete
        isOpen={isPopupDeliteOpen}
        onClose={closeAllPopups}
        handleDelite={handleDelite}
      />
    </div>
  );
}

export default App;
