import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import {imagesUpload} from '../../../utils/apis/apiAuth';
import * as actions from './actions'
import * as Types from './constants'

function updateEmployeeApi(employee) {
    return callApiUnAuth(`employee`, 'PUT', employee)
        .then(res => res)
        .catch(error => error.response.data);
}

function uploadImagesApi(img) {
    return imagesUpload(img)
        .then(res => res)
        .catch(error => error.response.data);
}

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


function* putEmployee(action) {
    try {
        const { admin } = action
        // const partnerRes = 
        yield call(updateEmployeeApi, admin)

        // if (msg.success === true) {            
        yield put(actions.updateAdminSuccess(admin));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        // yield put(actions.fetchPartnerFail(error));
    }

}


function* uploadImage(action) {
    try {
        const { admin } = action
        
      
            let rs = yield call(uploadImagesApi, admin.file)            
            let link = rs.data.data.link
            delete admin.file;
            admin.PartnerImage = link;
            yield call(updateEmployeeApi, admin)
        // if (msg.success === true) {            
        yield put(actions.updateImageSuccess(link));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.updateImageFail(error));
    }
}

function* watchfetchPartner() {
    yield takeLatest(Types.UPDATE_ADMIN, putEmployee);
    yield takeLatest(Types.ADMIN_SIGNIN, signIn);
    yield takeLatest(Types.ADMIN_CHANGE_IMAGE, uploadImage);
}

export default watchfetchPartner;