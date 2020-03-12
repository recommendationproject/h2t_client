import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

// function updatePartnerApi(admin) {
//     return callApiUnAuth(`admin`, 'PUT', admin)
//         .then(res => res)
//         .catch(error => error.response.data);
// }

function fetchCategoryApi() {
    return callApiUnAuth(`allcategory`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

function signInApi(admin) {
    return callApiUnAuth(`employee/signin`, 'POST', admin)
        .then(res => res)
        .catch(error => error.response.data);
}

/////////////////////////////

function* signIn(action) {
    try {
        const { user } = action
        let token = yield call(signInApi, user)
        const category = yield call(fetchCategoryApi)
        
        // if (msg.success === true) {            
        yield put(actions.signInSuccess({ token: token.data, category: category.data }));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.signInFail(error));
    }
}


// function* putPartner(action) {
//     try {
//         const { partner } = action
//         // const partnerRes = 
//         yield call(updatePartnerApi, partner)

//         // if (msg.success === true) {            
//         yield put(actions.updatePartnerSuccess(partner));
//         // } else {
//         // yield put(actions.fetchPartnerFail(partner));
//         // }

//     } catch (error) {
//         // yield put(actions.fetchPartnerFail(error));
//     }

// }

function* watchfetchPartner() {
    // yield takeLatest(Types.UPDATE_PARTNER, putPartner);
    yield takeLatest(Types.ADMIN_SIGNIN, signIn);
}

export default watchfetchPartner;