import LoginSaga from '../pages/admin/Login/sagas';
import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
}