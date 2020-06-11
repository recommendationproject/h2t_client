import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchOrderApi(partnerId) {
    return callApiUnAuth(`partner/order/${partnerId}`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}


function updateOrderApi(orderid, status) {
    return callApiUnAuth(`partner/order`, 'PUT', {orderid: orderid, status:status})
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchOrder(action) {
    try {
        const { partnerId } = action
        let order = yield call(fetchOrderApi, partnerId)           
        // if (msg.success === true) {            
        yield put(actions.fetchOrderSuccess(order.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchOrderFail(error));
    }
}


function* updateOrder(action) {
    try {
        const { orderid, status } = action
        
        let rsEdit=  yield call(updateOrderApi, orderid, status)
        
        if (rsEdit.data.type === 'success') {     
        yield put(actions.updateOrderSuccess(rsEdit.data));
        } else {
        yield put(actions.updateOrderFail(rsEdit.data));
        }

    } catch (error) {
        yield put(actions.updateOrderFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_ORDER, fetchOrder);
    yield takeLatest(Types.UPDATE_ORDER, updateOrder);
}

export default watchSaga;