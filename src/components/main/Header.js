import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="app-header">
    <Link to="/">
      <span className="highlight">BEER</span>FUN
    </Link>
  </header>
);

export default Header;
