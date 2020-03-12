import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import AdminLayout from './admin';
import PublicLayout from './public';
import adminRoutes from './routes/adminRoutes';
import publicRoutes from './routes/publicRoutes';
import Loadable from "react-loadable";
import MyLoadingComponent from "../components/LoadingComponent";
import { useStore, useDispatch } from 'react-redux';
import {mlts} from '../pages/admin/Account/actions'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
const Template = () => {

    const LoginPage = Loadable({
        loader: () => import("../pages/admin/SignIn"),
        loading: MyLoadingComponent
    });

    const store = useStore();
    const dispatch = useDispatch();
    const comp = (privateComponent) => {
        if ((localStorage.getItem("sessionadmin") && ((new Date(JSON.parse(localStorage.getItem("sessionadmin")).token.expires) - new Date()) >= 0)) && store.getState().adminInfo) {
            return privateComponent
        }
        if ((localStorage.getItem("sessionadmin") && ((new Date(JSON.parse(localStorage.getItem("sessionadmin")).token.expires) - new Date()) >= 0)) && store.getState().adminInfo === null) {
            dispatch(mlts(JSON.parse(localStorage.getItem("sessionadmin"))))
            return privateComponent
        }
        localStorage.removeItem("sessionadmin")
        return LoginPage
    }
    const lay = (layout) => {

        if ((localStorage.getItem("sessionadmin") && ((new Date(JSON.parse(localStorage.getItem("sessionadmin")).token.expires) - new Date()) >= 0))) {
            return layout
        }
        return 'Minimal'
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>

                    {_.map(adminRoutes, (route, key) => {
                        const { component, path, exact, layout } = route;
                        return (
                            <Route
                                key={key}
                                render={(route) => <AdminLayout component={comp(component)} route={route} layout={lay(layout)} />}
                                path={path}
                                exact={exact}
                            />
                        )
                    })}

                    {_.map(publicRoutes, (route, key) => {
                        const { component, path, exact, layout } = route;
                        return (
                            <Route
                                key={key}
                                render={(route) => <PublicLayout component={component} route={route} layout={layout} />}
                                path={path}
                                exact={exact}
                            />
                        )
                    })}
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}


export default Template;
