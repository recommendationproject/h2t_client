//Dependencies
import React from 'react';
import {NavLink} from 'react-router-dom';
//Internals
import './index.css';

const Header = () => (
  <div className="header">
    <h1 id="header-title">Shop Now</h1>
    <div className="links-header">
      <p><NavLink activeClassName="selected" className="nav-link-header" to="/type/men">Nam</NavLink></p>
      <p><NavLink activeClassName="selected" className="nav-link-header" to="/type/women">Nữ</NavLink></p>
      <p><NavLink activeClassName="selected" className="nav-link-header" to="/new">New</NavLink></p>
      <p><NavLink activeClassName="selected" className="nav-link-header" to="/sale">Sale</NavLink></p>
    </div>
  </div>
)

export default Header;
