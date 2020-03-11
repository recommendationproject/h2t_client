// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// Internals
import './index.css';


const Navbar = () => (
  // <nav className="navbar">
  //   <div className="nav-links">
  //     <ul>
  //       <li><NavLink activeClassName="selected" className="nav-link" exact to="/">Trang chủ</NavLink></li>
  //       <li><NavLink activeClassName="selected" className="nav-link" to="/women">Nam</NavLink></li>
  //       <li><NavLink activeClassName="selected" className="nav-link" to="/men">Nữ</NavLink></li>
  //     </ul>
  //   </div>
  //   <div className="shopping-cart">
  //     <NavLink to="/cart" style={{ color: 'white' }}><ShoppingCartIcon /></NavLink>
  //   </div>
  // </nav>
   <nav role='menu'>
   <input id='link-top' type='checkbox' />
   <p class='down' id='menu'>Menu</p>
   <ul id='nav'>
     <li role='none'>
       <input id='link-shop' />
       <label class='right' id='shop'>Shop</label>
       <ul id='nest'>
       </ul>
     </li>
    
   </ul>
 </nav>
);

export default Navbar;
