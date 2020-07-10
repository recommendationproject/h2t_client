import React, { useState, useEffect } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    ItemActive,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    LatestSales,
    UsersByDevice,
    LatestProducts,
    LatestOrders
} from './components';
import { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import { useStore } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        textAlign: 'center'
    },
}));

const Homepage = () => {
    const classes = useStyles();
    const [year, setYear] = React.useState(2020);

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const store = useStore();
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const result = await callApiUnauthWithHeader(`homepage`, 'GET', { year: year })
            setData(result.data);
        };
        fetchData();
    }, [store, year]);

    useEffect(() => {
        if (data.rsItemsActive) {
            setIsLoading(false);
        }
    }, [data]);

    return (

        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                    align={'center'}
                >
                    <FormControl variant="outlined" className={classes.formControl} >
                        <InputLabel id="demo-simple-select-outlined-label">Năm</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={year}
                            onChange={handleChange}
                            label="Năm"

                        >
                            <MenuItem value={2020}>2020</MenuItem>
                            <MenuItem value={2019}>2019</MenuItem>
                            <MenuItem value={2018}>2018</MenuItem>
                        </Select>
                    </FormControl>
                
                </Grid>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                        <React.Fragment>
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <ItemActive activeItem={data.rsItemsActive} />
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <TotalUsers rsTotalUser={data.rsTotalUser} rsTotalGuest={data.rsTotalGuest} />
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <TasksProgress rsOrderActive={data.rsOrderActive} rsOrderOfYear={data.rsOrderOfYear} />
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <TotalProfit rsTotal={data.rsTotal} />
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={12}
                                xl={9}
                                xs={12}
                            >
                                <LatestSales currentYear={data.rsTotalByMonth.map(e => e.count)} lastYear={data.rsTotalByMonthLastYear.map(e => e.count)} />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xl={3}
                                xs={12}
                            >
                                <UsersByDevice rsPercentByCategory={data.rsPercentByCategory} />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xl={3}
                                xs={12}
                            >
                                <LatestProducts rsTopCustomer={data.rsTopCustomer} />
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={12}
                                xl={9}
                                xs={12}
                            >
                                <LatestOrders rsLatestOrder={data.rsLatestOrder} />
                            </Grid>
                        </React.Fragment>
                    )}
            </Grid>
        </div>

    );
}

export default Homepage;