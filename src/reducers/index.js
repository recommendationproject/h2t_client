import { combineReducers } from 'redux';
import adminInfo from '../pages/admin/Account/reducers';
import product from '../pages/admin/Product/reducers';
import employee from '../pages/admin/Employee/reducers';
import userInfo from '../pages/public/Account/reducers';
const appReducers = combineReducers({
    adminInfo,
    product,
    employee,
    userInfo
});

export default appReducers;