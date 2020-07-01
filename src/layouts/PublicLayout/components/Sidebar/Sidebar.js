import React, { useEffect, useState } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import callApiUnauth from '../../../../utils/apis/apiUnAuth';
import LeftListItem from '../../../../components/Public/leftListItem';
import "react-image-gallery/styles/css/image-gallery.css";
const Sidebar = (props) => {
  console.log(props.location.pathname);
  
  const [dataHistory, setDataHistory] = useState([]);
  useEffect(() => {

    const fetchDataHistory = async (arr) => {
      const result = await callApiUnauth(`product/history`, 'POST', { lst: arr })
      setDataHistory(result.data);
    };
      
    if ('itemHistory' in localStorage) {
      let arrItemHistory = JSON.parse(localStorage.getItem('itemHistory'));
      fetchDataHistory(arrItemHistory);
    }
  }, []);
  return (
    <React.Fragment>
      {(dataHistory && dataHistory.length && props.location.pathname!=='/cart' && props.location.pathname!=='/signin' && props.location.pathname!=='/signup') > 0 ? (

        <React.Fragment>
          <div className="items-wrapper" style={{ marginTop: '32px' }}>
            <div className="items-title">
              <h3>SẢN PHẨM ĐÃ XEM</h3>
            </div>
            <div>
              <LeftListItem data={dataHistory} />
            </div>
          </div>
        </React.Fragment>
      ) : (
          <React.Fragment></React.Fragment>
        )}
      
    </React.Fragment>
  );
};

export default withRouter(Sidebar);
