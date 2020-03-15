import React from 'react';
import './index.css';

const Sidebar = () => {

  return (
    <div className="table_center">
       <div className="drop-down drop-down--active">
         <div id="dropDown" className="drop-down__button">
           <span className="drop-down__name">Nữ</span>

         </div>
         
         <div className="drop-down__menu-box">
           <ul className="drop-down__menu">
             <li data-name="profile" className="drop-down__item">Áo khoác </li>
             <li data-name="dashboard" className="drop-down__item">Áo len  </li>
             <li data-name="activity" className="drop-down__item">Áo nỉ chui đầu  </li>
           </ul>
         </div>
       </div>
</div>
  );
};

export default Sidebar;
