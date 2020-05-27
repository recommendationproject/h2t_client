// Dependencies
import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { callApiUnauthWithHeader } from '../../../../utils/apis/apiUnAuth';
import { signout } from '../../../../pages/public/Account/actions';
import './index.css';
import { useStore, useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Tooltip} from '@material-ui/core';
import $ from 'jquery';
import callApiUnauthWithBody from '../../../../utils/apis/apiUnAuth';
var _ = require('lodash');
const Navbar = () => {

  var siteScroll = function () {
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > 100) {
            $('.js-sticky-header').addClass('shrink sticky');
        } else {
            $('.js-sticky-header').removeClass('shrink sticky');
        }

    })
};
siteScroll();

  const [data, setData] = useState([]);
  let history = useHistory();
  const [textSearch, setSetTextSearch] = useState([]);
  const firstUpdate = useRef(true);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`categoryGroupByGender`, 'GET')
      setData(result.data);
    };
    fetchData();
  }, []);
  const handleSignout = () => {
    localStorage.removeItem('sessionuser');
    dispatch(signout());
    history.push('/');
  }

  const handleChange = async (event) => {
    setSetTextSearch(event.target.value)
  }

  const handleSearch = () => {
    history.push(`/search/${textSearch}`);
  }

  const throttled = useRef(_.throttle((textSearch) => {
    callApiUnauthWithBody(`search?limit=6`, 'POST', { keyword: textSearch })
      .then(res => console.log(res));
  }, 2000))

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    throttled.current(textSearch)
  }, [textSearch])

  var items = data.map((track, i) => {
    var subItems = track.items.map((t, j) => {
      return (<li key={j} className="menu-item"><NavLink to={"/category/" + t.id} >{t.name}</NavLink></li>)
    });

    return (<li key={i} className="menu-item itemNav menu-main">
      <NavLink to={"/type/" + track.group_eng} style={{ color: 'white' }}>{track.group}</NavLink>
      <ol className="sub-menu">
        {subItems}
      </ol>
    </li>)
  });

  return (
    // <nav className="navbar">
    //   <div className="nav-links">
    //     <nav className="menu">
    //       <ol>
    //         <li className="menu-item menu-main">
    //           <NavLink to="/" style={{ color: 'white' }}>Trang chủ</NavLink>
    //         </li>
    //         {items}
    //       </ol>
    //     </nav>
    //   </div>


    //   <div className="shopping-cart">
    //     {store.getState().userInfo ? (
    //       <div>
    //         <NavLink to='/acc' style={{ color: 'white', marginRight: '10px' }}><PersonIcon /></NavLink>
    //         <ExitToAppIcon onClick={handleSignout} style={{ color: 'white', marginRight: '10px', lineHeight: '3rem' }}></ExitToAppIcon>
    //       </div>
    //      ) : (

    //       <div><NavLink to='/signup' style={{ color: 'white', marginRight: '10px', lineHeight: '3rem' }}>Đăng ký</NavLink>
    //       <NavLink to='/signin' style={{ color: 'white', marginRight: '10px', lineHeight: '3rem' }}>Đăng nhập</NavLink></div>
    //      )}
    //     <NavLink to="/cart" style={{ color: 'white' }}><ShoppingCartIcon /></NavLink>
    //   </div>
    // </nav>
    <header style={{display:'block'}} className={'js-sticky-header'}>
      <div className="headerCustom">
        <div className="container">
          <div className="">

            <div className="logo">
              <NavLink to="/"> <img src="https://h2tstore.vn/media/banner/logo_700-350.png" alt="logo H2TShop" /> </NavLink> 
            </div>

            <div className="header-search position-relative">
            
                <input type="text" name="q" placeholder="Tìm kiếm" id="text_search" className="form_search" onChange={handleChange} />
                <button type="submit" className="header-button_submit" onClick={handleSearch}>
                  <SearchIcon />
                </button>
             
              <div className="autocomplete-suggestions"></div>
            </div>

            <div className="header-contact-cart ">
            <div className="d-flex align-items-center justify-content-between">
                {store.getState().userInfo ? (
                  <div>
                    <Tooltip title="Tài khoản" aria-label="Tài khoản"><NavLink to='/acc' style={{ color: 'white', marginRight: '10px' }}><PersonIcon fontSize={'large'}/></NavLink></Tooltip>
                    <Tooltip title="Đăng xuất" aria-label="Đăng xuất"><ExitToAppIcon fontSize={'large'} onClick={handleSignout} style={{ color: 'white', marginRight: '10px' }}></ExitToAppIcon></Tooltip>
                  </div>
                ) : (

                    <div><Tooltip title="Đăng ký" aria-label="Đăng ký"><NavLink to='/signup' style={{ color: 'white', marginRight: '10px' }}><BorderColorIcon fontSize={'large'}/></NavLink></Tooltip>
                      <Tooltip title="Đăng nhập" aria-label="Đăng nhập"><NavLink to='/signin' style={{ color: 'white', marginRight: '10px' }}><VpnKeyIcon fontSize={'large'}/></NavLink></Tooltip></div>
                  )}
                {/* <div className="contact col">
                  <NavLink to="/lien-he"> <img src="https://h2tstore.vn/template/2019/images/lien-he.png" alt="liên hệ" /> </NavLink>
                </div> */}
                <div className="cart col">
                <Tooltip title="Giỏ hàng" aria-label="Giỏ hàng"><NavLink to="/cart" style={{ color: 'white', marginRight: '10px' }}> <ShoppingCartIcon fontSize={'large'}/> </NavLink></Tooltip>
                </div>
              </div>
            </div>



            <div className="clear"></div>
          </div>
        </div>
      </div>

      <div id="navbar">
        <nav className="global-nav">
          <div className="container">
           <center>
           <ul className="ul">
              <li className="itemNav"><a href="/">TRANG CHỦ</a></li>
              {items}

              <li className="itemNav"><a href="/new">NEW</a></li>
              <li className="itemNav"><a href="/sale">SALE</a></li>
            </ul>
           </center>
          </div>
        </nav>
      </div>

    </header >
  )

};

export default Navbar;
