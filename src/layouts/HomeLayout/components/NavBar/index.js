// Dependencies
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { callApiUnauthWithHeader } from '../../../../utils/apis/apiUnAuth';
import './index.css';
import { useStore } from 'react-redux';

const Navbar = () => {

  const [data, setData] = useState([]);
  const store = useStore();
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`categoryGroupByGender`, 'GET')
      setData(result.data);
    };
    fetchData();
  }, []);

  var items = data.map((track, i) => {
    var subItems = track.items.map((t, j) => {
      return (<li key={j} className="menu-item"><NavLink to={"/category/" + t.id} >{t.name}</NavLink></li>)
    });

    return (<li key={i} className="menu-item menu-main">
      <NavLink to={"/type/" + track.group_eng} style={{ color: 'white' }}>{track.group}</NavLink>
      <ol className="sub-menu">
        {subItems}
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
        {store.getState().userInfo ? (
          <div>
            <NavLink to='/acc' style={{ color: 'white', marginRight: '10px' }}><PersonIcon /></NavLink>
            <ExitToAppIcon style={{ color: 'white', marginRight: '10px', lineHeight: '3rem' }}></ExitToAppIcon>
          </div>
        ) : (

            <div><NavLink to='/signup' style={{ color: 'white', marginRight: '10px', lineHeight: '3rem' }}>Đăng ký</NavLink>
              <NavLink to='/signin' style={{ color: 'white', marginRight: '10px', lineHeight: '3rem' }}>Đăng nhập</NavLink></div>
          )}
        <NavLink to="/cart" style={{ color: 'white' }}><ShoppingCartIcon /></NavLink>
      </div>
    </nav>
  )

};

export default Navbar;
