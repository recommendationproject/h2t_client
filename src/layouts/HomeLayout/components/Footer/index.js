//Dependencies
import React from 'react';
//Internals
import './index.css';
import './footer-font.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer class="footer-distributed">

  <div class="footer-left">

    <h3>H2<span>T</span></h3>

    <p class="footer-links">
      <Link class='customFooterLink' to="/">TRANG CHỦ</Link>
      ·
      <Link class='customFooterLink' to="/new">NEW</Link>
      ·
      <Link class='customFooterLink' to="/sale">SALE</Link>
    </p>

    <p class="footer-company-name">H2T &copy; 2015</p>
  </div>

  <div class="footer-center">

    <div>
      <i class="fa fa-map-marker"></i>
      <p><span>01 Liễu Giai</span> Ba Đình, Hà Nội</p>
    </div>

    <div>
      <i class="fa fa-phone"></i>
      <p>+84 967483945</p>
    </div>

    <div>
      <i class="fa fa-envelope"></i>
      <p><Link to="#" class='customFooterLink'>support@h2t.com</Link></p>
    </div>

  </div>

  <div class="footer-right">

    <p class="footer-company-about">
      <span>Thông tin cửa hàng</span>
      Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
    </p>

    <div class="footer-icons">

      <Link to="#"><i class="fa fa-facebook"></i></Link>
      <Link to="#"><i class="fa fa-twitter"></i></Link>
      <Link to="#"><i class="fa fa-linkedin"></i></Link>
      <Link to="#"><i class="fa fa-github"></i></Link>

    </div>

  </div>

</footer>
)

export default Footer;
