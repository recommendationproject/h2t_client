import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import {imagesUpload} from '../../../../../utils/apis/apiAuth';
import * as actions from './actions'
import * as Types from './constants'

function fetchSourceOfItemsApi(partnerId) {
    return callApiUnAuth(`partner/sourceofitems/${partnerId}`, 'GET', [])
        .then(res => res)
        .catch(error => error.response.data);
}


function addSourceOfItemsApi(item) {
    return callApiUnAuth(`partner/sourceofitems`, 'POST', item)
        .then(res => res)
        .catch(error => error.response.data);
}
function uploadImagesApi(img) {
    return imagesUpload(img)
        .then(res => res)
        .catch(error => error.response.data);
}

// function deleteProductApi(productId) {
//     return callApiUnAuth(`partner/product/${productId}`, 'DELETE', [])
//         .then(res => res)
//         .catch(error => error.response.data);
// }

// function updateProductApi(product) {
//     return callApiUnAuth(`partner/product`, 'PUT', product)
//         .then(res => res)
//         .catch(error => error.response.data);
// }

function* fetchPSourceOfItemsApi(action) {
    try {
        const { partnerId } = action
        let items = yield call(fetchSourceOfItemsApi, partnerId)   
        // if (msg.success === true) {      
                  
        yield put(actions.fetchSourceOfItemsSuccess(items.data));
        // } else {
        // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchSourceOfItemsFail(error));
    }
}

function* addSourceOfItems(action) {
    try {
        const { item } = action
        let rs = yield call(uploadImagesApi, item.Image[0])
        item.Image = rs.data.data.link
        let rsItem = yield call(addSourceOfItemsApi, item)        
        if (rsItem.data.type === 'success') {            
        yield put(actions.addSourceOfItemsSuccess(rsItem.data));
         } else {
         yield put(actions.addSourceOfItemsFail(rsItem.data));
         }

    } catch (error) {
        yield put(actions.addSourceOfItemsFail(error));
    }
}

// function* updateProduct(action) {
//     try {
//         const { product } = action
//         yield call(updateProductApi, product)

//         // if (msg.success === true) {            
//         yield put(actions.updateProductSuccess(product));
//         // } else {
//         // yield put(actions.fetchPartnerFail(partner));
//         // }

//     } catch (error) {
//         yield put(actions.updateProductFail(error));
//     }
// }

// function* deleteProduct(action) {
//     try {
//         const { productId } = action
//         yield call(deleteProductApi, productId)

//         // if (msg.success === true) {            
//         yield put(actions.deleteProductSuccess(productId));
//         // } else {
//         // yield put(actions.fetchPartnerFail(partner));
//         // }

//     } catch (error) {
//         yield put(actions.deleteProductFail(error));
//     }
// }


function* watchSaga() {
    yield takeLatest(Types.FETCH_SOURCEOFITEMS, fetchPSourceOfItemsApi);
    yield takeLatest(Types.ADD_SOURCEOFITEMS, addSourceOfItems);
    // yield takeLatest(Types.DELETE_PRODUCT, deleteProduct);
    // yield takeLatest(Types.UPDATE_PRODUCT, updateProduct);
}

export default watchSaga;