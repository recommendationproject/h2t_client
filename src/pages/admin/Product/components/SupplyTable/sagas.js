import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchSupplyApi() {
    return callApiUnAuth(`supply`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function addSupplyApi(supply) {
    return callApiUnAuth(`supply`, 'POST', supply)
        .then(res => res)
        .catch(error => error.response.data);
}

function deleteSupplyApi(supplyId) {
    return callApiUnAuth(`supply/${supplyId}`, 'DELETE', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function updateSupplyApi(supply) {
    return callApiUnAuth(`supply`, 'PUT', supply)
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchSupply() {
    try {

        let supply = yield call(fetchSupplyApi)
        // if (msg.success === true) {            
        yield put(actions.fetchSupplySuccess(supply.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchSupplyFail(error));
    }
}

function* addSupply(action) {
    try {
        const { supply } = action

        let rsAdd = yield call(addSupplyApi, supply)
        if (rsAdd.data.type === 'success') {
            yield put(actions.addSupplySuccess(rsAdd.data));
        } else {
            yield put(actions.addSupplyFail(rsAdd.data));
        }

    } catch (error) {
        console.log(error);
        yield put(actions.addSupplyFail(error));
    }
}

function* updateSupply(action) {
    try {
        const { supply } = action
        let rsUpdate = yield call(updateSupplyApi, supply)
        if (rsUpdate.data.type === 'success') {
            yield put(actions.updateSupplySuccess(rsUpdate.data));
        } else {
            yield put(actions.updateSupplyFail(rsUpdate.data));
        }
    } catch (error) {
        yield put(actions.updateSupplyFail(error));
    }
}

function* deleteSupply(action) {
    try {
        const { supplyId } = action
        let rs = yield call(deleteSupplyApi, supplyId)

        if (rs.data.type === 'success') {
            yield put(actions.deleteSupplySuccess(rs.data));
        } else {
            yield put(actions.deleteSupplyFail(rs.data));
        }

    } catch (error) {
        yield put(actions.deleteSupplyFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_SUPPLY, fetchSupply);
    yield takeLatest(Types.ADD_SUPPLY, addSupply);
    yield takeLatest(Types.DELETE_SUPPLY, deleteSupply);
    yield takeLatest(Types.UPDATE_SUPPLY, updateSupply);
}

export default watchSaga;