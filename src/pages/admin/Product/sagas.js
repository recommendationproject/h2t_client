import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import { imagesUpload } from '../../../utils/apis/apiAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchProductApi() {
    return callApiUnAuth(`product/admin`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function addProductApi(product) {
    return callApiUnAuth(`product`, 'POST', product)
        .then(res => res)
        .catch(error => error.response.data);
}

function uploadImagesApi(img) {
    return imagesUpload(img)
        .then(res => res)
        .catch(error => error.response.data);
}

function deleteProductApi(productId) {
    return callApiUnAuth(`product/${productId}`, 'DELETE', [])
        .then(res => res)
        .catch(error => error.response.data);
}

function updateProductApi(product) {
    return callApiUnAuth(`product`, 'PUT', product)
        .then(res => res)
        .catch(error => error.response.data);
}

function* fetchProduct() {
    try {

        let product = yield call(fetchProductApi)
        // if (msg.success === true) {            
        yield put(actions.fetchProductSuccess(product.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchProductFail(error));
    }
}

function* addProduct(action) {
    try {
        const { product } = action
        let rsAdd = yield call(addProductApi, product)
        console.log(rsAdd);
        
        if (rsAdd.data.type === 'success') {
            yield put(actions.addProductSuccess(rsAdd.data));
        } else {
            yield put(actions.addProductFail(rsAdd.data));
        }

    } catch (error) {
        console.log(error);
        yield put(actions.addProductFail(error));
    }
}

function* updateProduct(action) {
    try {
        const { product } = action
        let rs = yield call(updateProductApi, product)

        if (rs.data.type === 'success') {
            yield put(actions.updateProductSuccess(rs.data));
        } else {
            yield put(actions.updateProductFail(rs.data));
        }

    } catch (error) {
        yield put(actions.updateProductFail(error));
    }
}

function* deleteProduct(action) {
    try {
        const { productId } = action
        let rs = yield call(deleteProductApi, productId)

         if (rs.data.type === 'success') {                         
        yield put(actions.deleteProductSuccess(rs.data));
        } else {
        yield put(actions.deleteProductFail(rs.data));
        }

    } catch (error) {
        yield put(actions.deleteProductFail(error));
    }
}


function* watchSaga() {
    yield takeLatest(Types.FETCH_PRODUCT, fetchProduct);
    yield takeLatest(Types.ADD_PRODUCT, addProduct);
    yield takeLatest(Types.DELETE_PRODUCT, deleteProduct);
    yield takeLatest(Types.UPDATE_PRODUCT, updateProduct);
}

export default watchSaga;