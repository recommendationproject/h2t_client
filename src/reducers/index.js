import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';

const appReducers = combineReducers({
    users
});

export default appReducers;