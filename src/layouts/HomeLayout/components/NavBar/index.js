// Dependencies
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { callApiUnauthWithHeader } from '../../../../utils/apis/apiUnAuth';
// Internals
import './index.css';

const Navbar = () => {

  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`allcategory`, 'GET')
      setData(result.data);
    };
    fetchData();
    // setIsLoading(false);
  }, []);

  var items = data.map((track, i) => {
    var subItems = track.items.map((t, j) => {
      return (<li key={j} className="menu-item"><NavLink to={"/category/" + t.id} >{t.name}</NavLink></li>)
    });

    return (<li key={i} className="menu-item menu-main">
      <NavLink to={"/type/" + track.group_eng} style={{ color: 'white' }}>{track.group}</NavLink>
      <ol className="sub-menu">
        {subItems}
        <li className="menu-item"><NavLink to="/cart" >Phông</NavLink></li>
      </ol>
    </li>)
  });

  return (
    <nav className="navbar">
      <div className="nav-links">
        <nav className="menu">
          <ol>
            <li className="menu-item menu-main">
              <NavLink to="/" style={{ color: 'white' }}>Trang chủ</NavLink>
            </li>
            {items}
          </ol>
        </nav>
      </div>


      <div className="shopping-cart">
        <NavLink to="/cart" style={{ color: 'white' }}><ShoppingCartIcon /></NavLink>
      </div>
    </nav>
  )
  //    <nav role='menu'>
  //    <input id='link-top' type='checkbox' />
  //    <p class='down' id='menu'>Menu</p>
  //    <ul id='nav'>
  //      <li role='none'>
  //        <input id='link-shop' />
  //        <label class='right' id='shop'>Shop</label>
  //        <ul id='nest'>
  //        </ul>
  //      </li>

  //    </ul>
  //  </nav>
};

export default Navbar;
