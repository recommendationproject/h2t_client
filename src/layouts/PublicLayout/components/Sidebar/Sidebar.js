import React, { useEffect, useState } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import { callApiUnauthWithHeader } from '../../../../utils/apis/apiUnAuth';
import { NavLink } from 'react-router-dom';
const Sidebar = (props) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`categoryGroupByGender`, 'GET')
      setData(result.data);
    };
    fetchData();
  }, []);

  var items = data.map((track, i) => {
    var subItems = track.items.map((t, j) => {
      return (<NavLink key={j} to={"/category/" + t.id} ><li data-name="profile" className="drop-down__item">{t.name} </li></NavLink>)
    });

    return (
      <div className="drop-down drop-down--active" key={i}>
      <NavLink to={"/type/" + track.group_eng} style={{ color: 'white' }}>
      <div id="dropDown" className="drop-down__button">
      <span className="drop-down__name">{track.group}</span>
      </div></NavLink>

      <div className="drop-down__menu-box">
        <ul className="drop-down__menu">
          {subItems}
        </ul>
      </div>
      </div>
  )
  });
return (
  <div className="table_center">
    {props.match.path === '/acc' ? (
      <div></div>
    ) : (
        <React.Fragment>
          
        { items }
        </React.Fragment>
      )}
  </div>
);
};

export default withRouter(Sidebar);
