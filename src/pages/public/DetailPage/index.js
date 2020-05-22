import React, { useEffect, useState } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Loading from 'react-fullscreen-loading';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import callApiUnauth, { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import map from 'lodash/map';
import { TextField, Button } from '@material-ui/core';
import { useStore } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import ItemRecommend from '../../../components/Public/ItemRecommend';
import Item from '../../../components/Public/Item';
var CurrencyFormat = require('react-currency-format');
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)

    }
}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const DetailPage = (props) => {
    const [data, setData] = useState([]);
    const [dataRecommend, setDataRecommend] = useState([]);
    const [dataBySupp, setDataBySupp] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);
    const [amount, setAmount] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [add, setAdd] = useState(true);
    const productId = props.route.match.params.id;
    useEffect(() => {

        const fetchData = async () => {
            const result = await callApiUnauthWithHeader(`product/detail`, 'GET', { id: productId })
            setData(result.data.product);
            setImages(result.data.images);
            fetchDataBySupp(result.data.product.suppid)
        };
        fetchData();
        const fetchDataBySupp = async (suppid) => {
            const result = await callApiUnauthWithHeader(`recommentBySupp/${suppid}?limit=6`, 'GET', {})
            setDataBySupp(result.data);
        };
        let userid = null;
        if (store.getState().userInfo) {
            userid = store.getState().userInfo.token.user.id;
        }

        const fetchDataRecommend = async (userid) => {
            const result = await callApiUnauthWithHeader(`product`, 'GET', { userid: userid })
            setDataRecommend(result.data);
        };
        fetchDataRecommend(userid);

        const fetchDataHistory = async (arr) => {
            const result = await callApiUnauth(`product/history`, 'POST', { lst: arr })
            setDataHistory(result.data);
        };

        if ('itemHistory' in localStorage) {
            let arrItemHistory = JSON.parse(localStorage.getItem('itemHistory'));
            fetchDataHistory(arrItemHistory);
        }
    }, []);
    console.log(dataBySupp);
    
    useEffect(() => {
        if (data.id) {
            setIsLoading(false);
            let arrItemHistory = [];
            if ('itemHistory' in localStorage) {
                arrItemHistory = JSON.parse(localStorage.getItem('itemHistory'));
            }

            if (arrItemHistory.length === 10) {
                arrItemHistory.pop();
            }
            let checkExist = 0;
            arrItemHistory.forEach(element => {
                if (element === data.id)
                    checkExist = 1
            });
            if (checkExist === 0)
                arrItemHistory.unshift(data.id);
            localStorage.setItem('itemHistory', JSON.stringify(arrItemHistory));
        }
    }, [data]);

    const handleChange = event => {
        event.persist();
        if (data.amount >= event.target.value && event.target.value > 0) {
            setAmount(event.target.value);
            setAdd(false);
        } else {
            setAdd(true);
        }
    };

    const classes = useStyles();
    const store = useStore();
    const { addToast } = useToasts();
    const addToCart = async () => {
        if (store.getState().userInfo) {
            await callApiUnauth(`addCart`, 'POST', { product_id: props.product.id, customer_id: store.getState().userInfo.token.user.id, amount: amount });
            addToast('Thêm thành công', { autoDismiss: true, appearance: 'success' })
        }
        else {
            addToast('Bạn cần đăng nhập để thêm vào giỏ hàng', { autoDismiss: true, appearance: 'success' })
        }
    }
    return (

        <div className={classes.root}>
            {isLoading ? (
                <Loading loading background="#2ecc71" loaderColor="#3498db" />
            ) : (
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid container
                            lg={9}
                            md={9}
                            xl={9}
                            xs={9}>
                            <Grid
                                item
                                lg={8}
                                md={8}
                                xl={8}
                                xs={8}
                            >
                                <ImageGallery
                                    items={images}
                                    lazyLoad={true}
                                    showPlayButton={false}
                                    showBullets={true}
                                    showIndex={true}
                                    autoPlay={true}
                                    slideOnThumbnailOver={true} />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={4}
                                xl={4}
                                xs={4}
                            >
                                <h2>{data.name}</h2>
                                <p>Mã : {data.id}</p>
                                <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={value => <div style={{ color: 'red' }}>{value}</div>} />
                                <p style={{ marginTop: '40px' }}>Mô tả :</p>
                                <p>{data.description}</p>
                                <p style={{ marginTop: '40px' }}>Số lượng trong kho : {data.amount}</p>
                                <TextField
                                    id="outlined-number"
                                    label="Số lượng"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                    style={{ width: '100%', margin: '10px 0px' }}
                                    variant="outlined"
                                    inputProps={{ min: "1", max: data.amount, step: "1" }}
                                />
                                <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ width: '100%' }} onClick={addToCart} disabled={add}>
                                    Thêm vào giỏ hàng
                            </Button>
                            </Grid>

                            
                                {dataRecommend.recommend && dataRecommend.recommend.length > 0 ? (
                                    <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xl={12}
                                    xs={12}
                                >
                                        <div className="items-title">
                                            <h4>Gợi ý cho bạn</h4>
                                        </div>
                                            <Carousel
                                                swipeable={false}
                                                draggable={false}
                                                showDots={true}
                                                responsive={responsive}
                                                ssr={true} // means to render carousel on server-side.
                                                infinite={true}
                                                autoPlaySpeed={1000}
                                                keyBoardControl={true}
                                                customTransition="all .5"
                                                transitionDuration={500}
                                                containerClass="carousel-container"
                                                dotListClass="custom-dot-list-style"
                                                itemClass="carousel-item-padding-40-px"
                                            >
                                                {map(dataRecommend.recommend, (product, i) => (
                                                    <ItemRecommend key={i} product={product} />
                                                ))}
                                            </Carousel>
                                        </Grid>
                                ) : (
                                        <React.Fragment></React.Fragment>
                                    )}
                           

                            <Grid
                                item
                                lg={12}
                                md={12}
                                xl={12}
                                xs={12}
                            >
                                {dataHistory && dataHistory.length > 0 ? (
                                    <React.Fragment>
                                        <div className="items-title">
                                            <h4>Xem gần đây</h4>
                                        </div>
                                            <Carousel
                                                swipeable={false}
                                                draggable={false}
                                                showDots={true}
                                                responsive={responsive}
                                                ssr={true} // means to render carousel on server-side.
                                                infinite={true}
                                                autoPlaySpeed={1000}
                                                keyBoardControl={true}
                                                customTransition="all .5"
                                                transitionDuration={500}
                                                containerClass="carousel-container"
                                                dotListClass="custom-dot-list-style"
                                                itemClass="carousel-item-padding-40-px"
                                            >
                                                {map(dataHistory, (product, i) => (
                                                    <ItemRecommend key={i} product={product} />
                                                ))}
                                            </Carousel>
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment></React.Fragment>
                                    )}
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            lg={3}
                            md={3}
                            xl={3}
                            xs={3}
                        >
                            {dataBySupp && dataBySupp.length > 0 ? (

                                <React.Fragment>
                                    <div className="items-wrapper">
                                        <div className="items-title">
                                            <h4>Sản phẩm cùng hãng</h4>
                                        </div>
                                        <div className="items">
                                            {map(dataBySupp, (product, i) => (
                                                <ItemRecommend key={i} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        <div className="items-wrapper">
                                            <div className="items-title">
                                                <h4>Mới nhất</h4>
                                            </div>
                                            <div className="items">
                                                {map(dataRecommend.new, (product, i) => (
                                                    <ItemRecommend key={i} product={product} />
                                                ))}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}
                        </Grid>

                    </Grid>
                )}
        </div>

    );
}

export default DetailPage;