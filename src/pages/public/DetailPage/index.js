import React, { useEffect, useState } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Loading from 'react-fullscreen-loading';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import callApiUnauth, { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import { TextField, Button } from '@material-ui/core';
import { useStore } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
var CurrencyFormat = require('react-currency-format');

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)

    }
}));

const DetailPage = (props) => {
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const productId = props.route.match.params.id;
    useEffect(() => {

        const fetchData = async () => {
            const result = await callApiUnauthWithHeader(`product/detail`, 'GET', { id: productId })
            setData(result.data.product);
            setImages(result.data.images);
        };
        fetchData();
    }, []);

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
    const classes = useStyles();
    const store = useStore();
    const { addToast } = useToasts();
    const addToCart = async () => {
        if (store.getState().userInfo) {
            await callApiUnauth(`addCart`, 'POST', { product_id: props.product.id, customer_id: store.getState().userInfo.token.user.id, amount: 1 });
            addToast('Thêm thành công', { autoDismiss: true, appearance: 'success' })
        } else {
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
                            <p style={{ marginTop: '40px' }}>Mô tả</p>
                            <p>{data.description}</p>
                            <p style={{ marginTop: '40px' }}>Số lượng trong kho: {data.amount}</p>
                            <TextField
                                id="outlined-number"
                                label="Số lượng"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '100%', margin: '10px 0px' }}
                                variant="outlined"
                                inputProps={{ min: "1", max: data.amount, step: "1" }}
                            />
                            <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ width: '100%' }} onClick={addToCart}>
                                Thêm vào giỏ hàng
                            </Button>
                        </Grid>
                    </Grid>
                )}
        </div>

    );
}

export default DetailPage;