import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import {imagesUpload} from '../../../utils/apis/apiAuth';
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
        yield put(actions.fetchProductSuccess(product));
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
        const imgLink = [];  

        for (let index = 0; index < product.img.length; index++) {
            let rs = yield call(uploadImagesApi, product.img[index])
            imgLink.push(rs.data.data.link)
        }
        product.img = imgLink
       
        yield call(addProductApi, product)

        // if (msg.success === true) {            
        yield put(actions.addProductSuccess(product));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        console.log(error);
        yield put(actions.addProductFail(error));
    }
}

function* updateProduct(action) {
    try {
        const { product } = action
        yield call(updateProductApi, product)

        // if (msg.success === true) {            
        yield put(actions.updateProductSuccess(product));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
      
        
        yield put(actions.updateProductFail(error));
    }
}

function* deleteProduct(action) {
    try {
        const { productId } = action
        yield call(deleteProductApi, productId)

        // if (msg.success === true) {            
        yield put(actions.deleteProductSuccess(productId));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

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