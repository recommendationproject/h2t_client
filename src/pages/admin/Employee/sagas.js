import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchEmployeeApi() {
    return callApiUnAuth(`employee`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function addEmployeeApi(employee) {
    return callApiUnAuth(`employee`, 'POST', employee)
        .then(res => res)
        .catch(error => error.response.data);
}

function deleteEmployeeApi(employee) {
    return callApiUnAuth(`employee`, 'DELETE', employee)
        .then(res => res)
        .catch(error => error.response.data);
}

function updateEmployeeApi(employee) {
    return callApiUnAuth(`employee`, 'PUT', employee)
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchEmployee() {
    try {
      
        let employee = yield call(fetchEmployeeApi)   
        // if (msg.success === true) {            
        yield put(actions.fetchEmployeeSuccess(employee.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchEmployeeFail(error));
    }
}

function* addEmployee(action) {
    try {
        const { employee } = action      
        let rsAdd = yield call(addEmployeeApi, employee)

         if (rsAdd.data.type === 'success') {            
        yield put(actions.addEmployeeSuccess(rsAdd.data));
        } else {
        yield put(actions.addEmployeeFail(rsAdd.data));
        }

    } catch (error) {
        console.log(error);
        yield put(actions.addEmployeeFail(error));
    }
}

function* updateEmployee(action) {
    try {
        const { employee } = action
        let rsUpdate = yield call(updateEmployeeApi, employee)

         if (rsUpdate.data.type === 'success') {            
        yield put(actions.updateEmployeeSuccess(rsUpdate.data));
         } else {
        yield put(actions.updateEmployeeFail(rsUpdate.data));
        }

    } catch (error) {
      
        
        yield put(actions.updateEmployeeFail(error));
    }
}

function* deleteEmployee(action) {
    try {
        const { employee } = action
        let rsDelete = yield call(deleteEmployeeApi, employee)

        if (rsDelete.data.type === 'success') {            
        yield put(actions.deleteEmployeeSuccess(rsDelete.data));
        } else {
        yield put(actions.deleteEmployeeFail(rsDelete.data));
        }

    } catch (error) {
        yield put(actions.deleteEmployeeFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_EMPLOYEE, fetchEmployee);
    yield takeLatest(Types.ADD_EMPLOYEE, addEmployee);
    yield takeLatest(Types.DELETE_EMPLOYEE, deleteEmployee);
    yield takeLatest(Types.UPDATE_EMPLOYEE, updateEmployee);
}

export default watchSaga;