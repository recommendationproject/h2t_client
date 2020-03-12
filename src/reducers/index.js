import { combineReducers } from 'redux';
import adminInfo from '../pages/admin/Account/reducers';
import product from '../pages/admin/Product/reducers';
const appReducers = combineReducers({
    adminInfo,
    product
});

export default appReducers;