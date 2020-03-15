import React, {useEffect, useState }  from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Loading from 'react-fullscreen-loading';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {callApiUnauthWithHeader} from '../../../utils/apis/apiUnAuth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)

    }
}));

const DetailPage = (props) => {
    console.log(props.route.match.params.id);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await callApiUnauthWithHeader(`product/detail`, 'GET',{id: props.route.match.params.id})            
            setData(result.data.product);
            setImages(result.data.images);
          };
          fetchData();
    },[props]);
    console.log(data);
    
    useEffect(() => {
        if(data.id){
            setIsLoading(false);
        }
    },[data]);
    const classes = useStyles();

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
                    {data.toString()}
                </Grid>
            </Grid>
            )}
        </div>
       
    );
}

export default DetailPage;