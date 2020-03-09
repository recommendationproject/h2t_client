import React from 'react';
import './index.css';

const Sidebar = () => {

  return (
    <div class="table_center">
       <div class="drop-down drop-down--active">
         <div id="dropDown" class="drop-down__button">
           <span class="drop-down__name">Nữ</span>

         </div>
         
         <div class="drop-down__menu-box">
           <ul class="drop-down__menu">
             <li data-name="profile" class="drop-down__item">Áo khoác </li>
             <li data-name="dashboard" class="drop-down__item">Áo len  </li>
             <li data-name="activity" class="drop-down__item">Áo nỉ chui đầu  </li>
           </ul>
         </div>
       </div>
</div>
  );
};

export default Sidebar;
