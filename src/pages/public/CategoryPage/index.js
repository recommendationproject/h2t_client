import React, { useEffect, useState, useRef } from 'react';
import './main.css';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Loading from 'react-fullscreen-loading';
import Item from '../../../components/Public/Item';
import LeftListItem from '../../../components/Public/leftListItem';
import "react-image-gallery/styles/css/image-gallery.css";
import { NavLink } from 'react-router-dom';
import map from 'lodash/map';
import { useStore } from 'react-redux';
import { callApiUnauthWithHeader } from '../../../utils/apis/apiUnAuth';
import callApiUnauthWithBody from '../../../utils/apis/apiUnAuth';

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
                default:
                    type = 'category';
                    url = `category/${type}/${id}${search}`;
                    break;
            }
            if (props.route.match.path === '/search/:keyword') {
                const result = await callApiUnauthWithBody('search', 'POST', { keyword: props.route.match.params.keyword })
                setData(result.data.data);
                setPage({ currentPage: result.data.currentPage, totalPage: result.data.totalPage })
                setCateName(result.data.cateName);
            } else {
                const result = await callApiUnauthWithHeader(url, 'GET', {})
                console.log(props.route.match.path);
                
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
        // eslint-disable-next-line
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
                                            <LeftListItem data={dataRecommend.recommend} />
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
                                                <LeftListItem data={dataRecommend.new} />
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