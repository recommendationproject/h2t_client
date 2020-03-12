import AdminSaga from '../pages/admin/Account/sagas';
import ProductSaga from '../pages/admin/Product/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(AdminSaga);
  yield fork(ProductSaga);
}