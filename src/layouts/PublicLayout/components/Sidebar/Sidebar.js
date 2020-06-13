import React, { useEffect, useState } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import callApiUnauth, { callApiUnauthWithHeader } from '../../../../utils/apis/apiUnAuth';
import LeftListItem from '../../../../components/Public/leftListItem';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
const Sidebar = (props) => {

  const [dataHistory, setDataHistory] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {

        const fetchData = async () => {
            const result = await callApiUnauthWithHeader(`product`, 'GET', {  })
            setImages(result.data.new.map(i => {return {original:i.images, thumbnail:i.images}}))
        };
        fetchData();


    const fetchDataHistory = async (arr) => {
      const result = await callApiUnauth(`product/history`, 'POST', { lst: arr })
      setDataHistory(result.data);
    };
      
    if ('itemHistory' in localStorage) {
      let arrItemHistory = JSON.parse(localStorage.getItem('itemHistory'));
      fetchDataHistory(arrItemHistory);
    }
  }, []);
  console.log(images);
  return (
    <React.Fragment>
      {/* <ImageGallery
        items={images}
        lazyLoad={true}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        autoPlay={true}
        showNav={false}
        /> */}
      {dataHistory && dataHistory.length > 0 ? (

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
