// Dependencies
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { callApiUnauthWithHeader } from '../../../../utils/apis/apiUnAuth';
import { signout } from '../../../../pages/public/Account/actions';
import './index.css';
import { useStore, useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

const Navbar = () => {

  const [data, setData] = useState([]);
  let history = useHistory();
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
    <header style={{display:'block'}}>
      <div className="headerCustom">
        <div className="container">
          <div className="">

            <div className="logo">
              <NavLink to="/"> <img src="https://h2tstore.vn/media/banner/logo_700-350.png" alt="logo H2TShop" /> </NavLink> 
            </div>

            <div className="header-search position-relative">
              <form action="/tim" method="get" enctype="multipart/form-data" name="searchForm">
                <input type="text" name="q" placeholder="Tìm kiếm" id="text_search" className="form_search" />
                <button type="submit" className="header-button_submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
              <div className="autocomplete-suggestions"></div>
            </div>

            <div className="header-contact-cart ">
              <div className="d-flex align-items-center justify-content-between">
                <div className="contact col">
                  <NavLink to="/lien-he"> <img src="https://h2tstore.vn/template/2019/images/lien-he.png" alt="liên hệ" /> </NavLink>
                </div>
                <div className="cart col">
                  <NavLink to="/cart"> <img src="https://h2tstore.vn/template/2019/images/cart.png" alt="Giỏ hàng" /> </NavLink>
                </div>
              </div>
            </div>



            <div class="clear"></div>
          </div>
        </div>
      </div>

      <div id="navbar">
        <nav class="global-nav">
          <div class="container">
           <center>
           <ul class="ul">
              <li class="itemNav"><a href="/">TRANG CHỦ</a></li>
              {items}

              <li class="itemNav"><a href="/tin-tuc">TIN TỨC</a></li>
              <li class="itemNav"><a href="/lien-he">LIÊN HỆ</a></li>
            </ul>
           </center>
          </div>
        </nav>
      </div>

    </header >
  )

};

export default Navbar;
