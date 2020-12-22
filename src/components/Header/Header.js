import './Header.css';
import React from 'react';
import logo from '../../img/logo3.png';


function Header() {
    return(
      <header className="header">
        <img className="header__logo" src={logo} alt="logo"/>
        <h1 className="header__title">reynholm industries</h1>

      </header>
    );
}

export default Header;
