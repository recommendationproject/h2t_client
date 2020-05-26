import React, { useEffect, useState, useRef } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Loading from 'react-fullscreen-loading';
import Item from '../../../components/Public/Item';
import ItemRecommend from '../../../components/Public/ItemRecommend';
import "react-image-gallery/styles/css/image-gallery.css";
import { NavLink } from 'react-router-dom';
import map from 'lodash/map';
import { useStore } from 'react-redux';
import { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import callApiUnauthWithBody from '../../../utils/apis/apiUnAuth';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Image,
    Slide,
    Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)

    }
}));

const CategoryPage = (props) => {
    const [data, setData] = useState([]);
    const [dataRecommend, setDataRecommend] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState({ currentPage: 1, totalPage: 1 });
    const [cateName, setCateName] = useState('');
    const store = useStore();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            let type = '', url = '';
            const id = props.route.match.params.category ? props.route.match.params.category : props.route.match.params.type;
            const search = props.route.location.search ? props.route.location.search : '';
            switch (props.route.match.path) {
                case '/type/:type':
                    type = 'type';
                    url = `category/${type}/${id}${search}`;
                    break;
                case '/new':
                    type = 'new';
                    url = `listProduct/${type}${search}`;
                    break;
                case '/sale':
                    type = 'sale';
                    url = `listProduct/${type}${search}`;
                    break;
                case '/search/:keyword':
                    type = 'type';
                    url = `search/${type}/${id}${search}`;
                    break;
                default:
                    type = 'category';
                    url = `search/${type}/${id}${search}`;
                    break;
            }
            if (props.route.match.path === '/search/:keyword') {
                const result = await callApiUnauthWithBody('search', 'POST', { keyword: props.route.match.params.keyword })
                setData(result.data.data);
                setPage({ currentPage: result.data.currentPage, totalPage: result.data.totalPage })
                setCateName(result.data.cateName);
            } else {
                const result = await callApiUnauthWithHeader(url, 'GET', {})
                setData(result.data.data);
                setPage({ currentPage: result.data.currentPage, totalPage: result.data.totalPage })
                setCateName(result.data.cateName);
            }
        };
        fetchData();

        let userid = null;
        if (store.getState().userInfo) {
            userid = store.getState().userInfo.token.user.id;
        }

        const fetchDataRecommend = async (userid) => {
            const result = await callApiUnauthWithHeader(`product`, 'GET', { userid: userid })
            setDataRecommend(result.data);
        };
        fetchDataRecommend(userid);
    }, [props]);

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setIsLoading(false);
    }, [data]);
    const classes = useStyles();
    let leftPageinationItems = Array(page.currentPage).fill(2).map((x, i) => {
        if ((page.currentPage - i) > 0 && i !== 0) {
            return (<NavLink key={page.currentPage - i} to={props.route.match.url + '?page=' + (page.currentPage - i)}>{page.currentPage - i}</NavLink>)
        }
        return null;
    });

    let rightPageinationItems = Array(3).fill(2).map((x, i) => {
        if ((page.currentPage + i) <= page.totalPage && i !== 0) {
            return (<NavLink key={page.currentPage + i} to={props.route.match.url + '?page=' + (page.currentPage + 1)}>{page.currentPage + i}</NavLink>)
        }
        return null;
    });
    return (

        <div className={classes.root}>
            {isLoading ? (
                <Loading loading background="#2ecc71" loaderColor="#3498db" />
            ) : (
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid
                            item
                            lg={9}
                            md={9}
                            xl={9}
                            xs={9}
                        >
                            <div className="items-wrapper">
                                <div className="items-title">
                                    <h4>{cateName}</h4>
                                </div>
                                <div className="items">
                                    {map(data, (product, i) => (
                                        <Item key={i} product={product} />
                                    ))}
                                </div>
                            </div>
                            <div className="pagination-custom">
                                <nav className="pagination-nav"><span className="pagination-text">Trang {page.currentPage}</span>
                                    <div className="pagination-left">
                                        <NavLink to='' className="pagination-prev"></NavLink>
                                        {leftPageinationItems}
                                        <span className="pagination-line"></span>
                                    </div>
                                    <div className="pagination-right">
                                        <NavLink to='' className="pagination-next"></NavLink>
                                        {rightPageinationItems}
                                        <span className="pagination-line"></span>
                                    </div>
                                </nav>
                            </div>
                            <div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            md={3}
                            xl={3}
                            xs={3}
                        >

                            {dataRecommend.recommend && dataRecommend.recommend.length > 0 ? (

                                <React.Fragment>
                                    <div className="items-wrapper">
                                        <div className="items-title">
                                            <h4>Gợi ý cho bạn</h4>
                                        </div>
                                        <div>
                                            <CarouselProvider
                                                visibleSlides={2}
                                                totalSlides={6}
                                                orientation="vertical"
                                                naturalSlideWidth={400}
                                                naturalSlideHeight={500}
                                                step={2}
                                            >
                                            
                                                <Slider style={{ maxWidth: '300px' }}>
                                                    <Slide index={0}>
                                                        <Image src="https://laptops.vn/static/img/default.jpg" style={{ width: '100%', height: '300px' }} />
                                                        <p>ok</p>
                                                    </Slide>
                                                    <Slide index={1}>
                                                        <Image src="https://cuongquach.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png" style={{ width: '100%', height: '300px' }} />
                                                        <p>ok</p>
                                                    </Slide>
                                                    <Slide index={2}>
                                                        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=" style={{ width: '100%', height: '300px' }} />
                                                        <p>ok</p>
                                                    </Slide>
                                                    <Slide index={3}>
                                                        <Image src="https://omegamma.com.au/wp-content/uploads/2017/04/default-image.jpg" style={{ width: '100%', height: '300px' }} />
                                                        <p>ok</p>
                                                    </Slide>
                                                    <Slide index={4}>
                                                        <Image src="https://cuongquach.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png" style={{ width: '100%', height: '300px' }} />
                                                        <p>ok</p>
                                                    </Slide>
                                                    <Slide index={5}>
                                                        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAIVBMVEX19fXd3d3z8/Pq6urb29vi4uLx8fHt7e3n5+fk5OTf39/UY198AAACNElEQVR4nO3a4Y6rIBCGYRUE9P4veO0KijB022xSTOd9zj/Xk9AvMgjOMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgDualrGy+t6juhNXB7Sxofe4bmQVIxqt6z2w25jkhMbR9B7ZbcjzbMNMS3wroqX3yG7DtCJae4+sm+lqEFb8FNFU3qtCaAXyilVDSN7+J6Jx7j3+D2gWnkYkFzrK05OI1sV457wJ2avk9T9b1RHZOduTTcdd19qjOqK13GwEIro+QsJ7tPudbi5f8p3iWiSfe8zS0/bh4fYgRdQ6GRJOAJRGdG7oJx+CyaoSEe2Ot0GfZtZRmer3TJ0RpUVryfJIU6/avqmMKJ14XAqPjRlVR0kqI4qlp3xe4uVyVdMYUfzNVdVJ14koleZ6fd+nWnmurTGiPQlXH5HEha7ITmNETrz6sN9fFCOFEdl9yZeOIve/FGVcY0T7VSLK8BT9Sa5Fwqe0GAa1KO1h6xUtvnWzoqUkqs1Y7HmYiuw0RhR/c7UZW57e/tWqN6C4YTVWjKJ861YZUTouCpeM4gkJO/38McpWNXu0hFRbN50Rnb/arKPd/i3ulZu/l7Aby9uInMu+nAm9WUojanWjSQ1+WiOSMxL7+9RGJPXEyDfqjajqjnXSp1jlEW2z7fzG6OdWo5buiB4NRsGYsDQ61YnoNRoiEg7y36GiFbvZiE5Cp7KZ+g29hw4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIbhB3oYDvixwDtCAAAAAElFTkSuQmCC" style={{ width: '100%', height: '300px' }} />
                                                        <p>ok</p>
                                                    </Slide>
                                                </Slider>
                                                <ButtonBack>Back</ButtonBack>
                                                <ButtonNext>Next</ButtonNext>
                                            </CarouselProvider>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        <div className="items-wrapper">
                                            <div className="items-title">
                                                <h4>Mới nhất</h4>
                                            </div>
                                            <div>
                                                <CarouselProvider
                                                visibleSlides={2}
                                                totalSlides={6}
                                                orientation="vertical"
                                                naturalSlideWidth={400}
                                                naturalSlideHeight={500}
                                                step={2}
                                            >
                                            
                                                <Slider style={{ maxWidth: '100%' }}>
                                                {map(dataRecommend.new, (product, i) => (
                                                    
                                                    <Slide index={0}>
                                                        <ItemRecommend key={i} product={product} style={{ width: '100%', height: '100%' }}/>
                                                    </Slide>
                                                ))}
                                                   
                                                </Slider>
                                                <ButtonBack>Back</ButtonBack>
                                                <ButtonNext>Next</ButtonNext>
                                            </CarouselProvider>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >

                        </Grid>
                    </Grid>
                )
            }
        </div >

    );
}

export default CategoryPage;