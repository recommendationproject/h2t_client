//Dependencies
import React from 'react';
//Internals
import './index.css';
import './footer-font.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer-distributed">

  <div className="footer-left">

    <h3>H2<span>T</span></h3>

    <p className="footer-links">
      <Link className='customFooterLink' to="/">TRANG CHỦ</Link>
      ·
      <Link className='customFooterLink' to="/new">NEW</Link>
      ·
      <Link className='customFooterLink' to="/sale">SALE</Link>
    </p>

    <p className="footer-company-name">H2T &copy; 2015</p>
  </div>

  <div className="footer-center">

    <div>
      <i className="fa fa-map-marker"></i>
      <p><span>01 Liễu Giai</span> Ba Đình, Hà Nội</p>
    </div>

    <div>
      <i className="fa fa-phone"></i>
      <p>+84 967483945</p>
    </div>

    <div>
      <i className="fa fa-envelope"></i>
      <p><Link to="#" className='customFooterLink'>support@h2t.com</Link></p>
    </div>

  </div>

  <div className="footer-right">

    <p className="footer-company-about">
    <span>Thông tin cửa hàng</span>
      Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
    </p>

    <div className="footer-icons">

      <Link to="#"><i className="fa fa-facebook"></i></Link>
      <Link to="#"><i className="fa fa-twitter"></i></Link>
      <Link to="#"><i className="fa fa-linkedin"></i></Link>
      <Link to="#"><i className="fa fa-github"></i></Link>

    </div>

  </div>

</footer>
)

export default Footer;
