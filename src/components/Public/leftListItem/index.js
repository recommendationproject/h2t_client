//Dependencies
import React from 'react';
import ItemRecommend from '../ItemRecommend';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slide,
    Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import map from 'lodash/map';
const LeftListItem = (props) => {
console.log(props);
  return (
    <CarouselProvider
      visibleSlides={2}
      totalSlides={props.data.length}
      orientation="vertical"
      naturalSlideWidth={400}
      naturalSlideHeight={500}
      step={2}
    >

      <Slider style={{ maxWidth: '100%' }}>
        {map(props.data, (product, i) => (
          <Slide index={0} key={i}>
            <ItemRecommend key={i} product={product} style={{ width: '100%' }} />
          </Slide>
        ))}

      </Slider>
      <center style={{ marginTop: '20px' }}>
        <ButtonBack style={{ border: 'none' }}><ExpandLessIcon /></ButtonBack>
        <ButtonNext style={{ border: 'none' }}><ExpandMoreIcon /></ButtonNext>
      </center>
    </CarouselProvider>
  )
}

export default LeftListItem;
