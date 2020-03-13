import * as Types from './constants';
var initialState = null;

const employee = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_EMPLOYEE:
      return state
    case Types.FETCH_EMPLOYEE_SUCCESS:
      return action.listEmployee
    case Types.FETCH_EMPLOYEE_FAIL:
      return action.msg

    case Types.ADD_EMPLOYEE:
      return state
    case Types.ADD_EMPLOYEE_SUCCESS:
      return state
    case Types.ADD_EMPLOYEE_FAIL:
      return state

    case Types.DELETE_EMPLOYEE:
      return state
    case Types.DELETE_EMPLOYEE_SUCCESS:
      return state
    case Types.DELETE_EMPLOYEE_FAIL:
      return state

    case Types.UPDATE_EMPLOYEE:
      return state
    case Types.UPDATE_EMPLOYEE_SUCCESS:
      return state
    case Types.UPDATE_EMPLOYEE_FAIL:
      return state

    default:
      return state
  }
};


export default employee;    