import React, {useEffect, useState } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import  Item  from '../../../components/Public/Item';
import map from 'lodash/map';
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
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await callApiUnauthWithHeader(``, 'GET')
            setData(result.data);
          };
          fetchData();
        setIsLoading(false);        
    },[]);

    return (

        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
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
                >{isLoading ? (
                    <div>Loading ...</div>
                  ) : (
                    <div className="items-wrapper">
                        <div className="items-title">
                            <h4>Mới Nhất</h4>
                        </div>
                        <div className="items">
                            {map(data, (product) => (
                                <Item product={product} />
                            ))}
                        </div>
                    </div>
                     )}
                </Grid>
            </Grid>
        </div>

    );
}


export default Homepage;