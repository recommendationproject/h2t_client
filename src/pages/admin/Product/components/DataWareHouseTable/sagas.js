import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchWhApi() {
    return callApiUnAuth(`wh`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function addWhApi(wh) {
    return callApiUnAuth(`wh`, 'POST', wh)
        .then(res => res)
        .catch(error => error.response.data);
}

function deleteWhApi(whId) {
    return callApiUnAuth(`wh/${whId}`, 'DELETE', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function updateWhApi(wh) {
    return callApiUnAuth(`wh`, 'PUT', wh)
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchWh() {
    try {

        let wh = yield call(fetchWhApi)
        // if (msg.success === true) {            
        yield put(actions.fetchWhSuccess(wh.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchWhFail(error));
    }
}

function* addWh(action) {
    try {
        const { wh } = action

        let rsAdd = yield call(addWhApi, wh)
        if (rsAdd.data.type === 'success') {
            yield put(actions.addWhSuccess(rsAdd.data));
        } else {
            yield put(actions.addWhFail(rsAdd.data));
        }

    } catch (error) {
        console.log(error);
        yield put(actions.addWhFail(error));
    }
}

function* updateWh(action) {
    try {
        const { wh } = action
        let rsUpdate = yield call(updateWhApi, wh)
        if (rsUpdate.data.type === 'success') {
            yield put(actions.updateWhSuccess(rsUpdate.data));
        } else {
            yield put(actions.updateWhFail(rsUpdate.data));
        }
    } catch (error) {
        yield put(actions.updateWhFail(error));
    }
}

function* deleteWh(action) {
    try {
        const { whId } = action
        let rs = yield call(deleteWhApi, whId)

        if (rs.data.type === 'success') {
            yield put(actions.deleteWhSuccess(rs.data));
        } else {
            yield put(actions.deleteWhFail(rs.data));
        }

    } catch (error) {
        yield put(actions.deleteWhFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_WH, fetchWh);
    yield takeLatest(Types.ADD_WH, addWh);
    yield takeLatest(Types.DELETE_WH, deleteWh);
    yield takeLatest(Types.UPDATE_WH, updateWh);
}

export default watchSaga;