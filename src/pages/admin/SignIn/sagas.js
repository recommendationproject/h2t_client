import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function signInApi(user) {
    return callApiUnAuth(`employee/signin`, 'POST', user)
        .then(res => res)
        .catch(error => error.response.data);
}

// function fetchCityApi() {
//     return callApiUnAuth(`city`, 'GET', {})
//         .then(res => res)
//         .catch(error => error.response.data);
// }

function* signIn(action) {
    try {
        const { user } = action
        console.log(user);
        
        let token = yield call(signInApi, user)   
        // const city = yield call(fetchCityApi)
        // if (msg.success === true) {            
        yield put(actions.signInSuccess({token: token.data}));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.signInFail(error));
    }
}

function* watchSaga() {
    yield takeLatest(Types.ADMIN_SIGNIN, signIn);
}

export default watchSaga;