import { combineReducers } from 'redux';
import adminInfo from '../pages/admin/Account/reducers';
import product from '../pages/admin/Product/reducers';
import employee from '../pages/admin/Employee/reducers';
const appReducers = combineReducers({
    adminInfo,
    product,
    employee
});

export default appReducers;