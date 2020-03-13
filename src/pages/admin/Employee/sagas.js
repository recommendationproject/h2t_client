import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import {imagesUpload} from '../../../utils/apis/apiAuth';
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

function uploadImagesApi(img) {
    return imagesUpload(img)
        .then(res => res)
        .catch(error => error.response.data);
}

function deleteEmployeeApi(employeeId) {
    return callApiUnAuth(`employee/${employeeId}`, 'DELETE', [])
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
        yield put(actions.fetchEmployeeSuccess(employee));
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
        const imgLink = [];  

        for (let index = 0; index < employee.img.length; index++) {
            let rs = yield call(uploadImagesApi, employee.img[index])
            imgLink.push(rs.data.data.link)
        }
        employee.img = imgLink
       
        yield call(addEmployeeApi, employee)

        // if (msg.success === true) {            
        yield put(actions.addEmployeeSuccess(employee));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        console.log(error);
        yield put(actions.addEmployeeFail(error));
    }
}

function* updateEmployee(action) {
    try {
        const { employee } = action
        yield call(updateEmployeeApi, employee)

        // if (msg.success === true) {            
        yield put(actions.updateEmployeeSuccess(employee));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
      
        
        yield put(actions.updateEmployeeFail(error));
    }
}

function* deleteEmployee(action) {
    try {
        const { employeeId } = action
        yield call(deleteEmployeeApi, employeeId)

        // if (msg.success === true) {            
        yield put(actions.deleteEmployeeSuccess(employeeId));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

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