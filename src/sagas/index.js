import AdminSaga from '../pages/admin/Account/sagas';
import ProductSaga from '../pages/admin/Product/sagas';
import EmployeeSaga from '../pages/admin/Employee/sagas';
import UserSaga from '../pages/public/Account/sagas';
import { fork } from 'redux-saga/effects'
import SupplySaga from '../pages/admin/Product/components/SupplyTable/sagas';
import WhSaga from '../pages/admin/Product/components/DataWareHouseTable/sagas';
export default function* IndexSaga () {  
  yield fork(AdminSaga);
  yield fork(ProductSaga);
  yield fork(EmployeeSaga);
  yield fork(UserSaga);
  yield fork(SupplySaga);
  yield fork(WhSaga);
}