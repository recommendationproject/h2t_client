import React, {useEffect, useState } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import  Item  from '../../../components/Public/Item';
import Loading from 'react-fullscreen-loading';
import map from 'lodash/map';
import {useStore} from 'react-redux';
// import PRODUCTS from '../Data';
import {callApiUnauthWithHeader} from '../../../utils/apis/apiUnAuth';
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)

    }
}));


const Homepage = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);   
    const store = useStore(); 
    useEffect(() => {
        let userid = null;
        if(store.getState().userInfo){  
            userid = store.getState().userInfo.token.user.id;
        }
        console.log(userid);
        
        const fetchData = async (userid) => {
            const result = await callApiUnauthWithHeader(`product`, 'GET', {userid: userid})
            setData(result.data);
          };
          fetchData(userid);
    },[store]);

    useEffect(() => {
        if(data.new){
            setIsLoading(false);
        }
    },[data]);
    return (

        <div className={classes.root}>
            {isLoading ? (
                    <Loading loading background="#2ecc71" loaderColor="#3498db" />
                  ) : (
            <Grid
                container
                spacing={4}
            >
                {data.recommend.length > 0 ? (
                    <React.Fragment>
                        <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={8}
                    xl={8}
                    xs={8}
                >
                    <div className="items-wrapper">
                        <div className="items-title">
                            <h4>Gợi ý cho bạn</h4>
                        </div>
                        <div className="items">
                            {map(data.recommend, (product, i) => (
                                <Item key={i} product={product} />
                            ))}
                        </div>
                    </div>     
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                </Grid>
                    </React.Fragment>
                ) :(<React.Fragment></React.Fragment>)}
                <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={8}
                    xl={8}
                    xs={8}
                >
                    <div className="items-wrapper">
                        <div className="items-title">
                            <h4>Mới Nhất</h4>
                        </div>
                        <div className="items">
                            {map(data.new, (product, i) => (
                                <Item key={i} product={product} />
                            ))}
                        </div>
                    </div>     
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                </Grid>
                <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={8}
                    xl={8}
                    xs={8}
                >
                    <div className="items-wrapper">
                        <div className="items-title">
                            <h4>Đang hot</h4>
                        </div>
                        <div className="items">
                            {map(data.hot, (product, i) => (
                                <Item key={i} product={product} />
                            ))}
                        </div>
                    </div>     
                </Grid>
            </Grid>
             )}
        </div>

    );
}


export default Homepage;