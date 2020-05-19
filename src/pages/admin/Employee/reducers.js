import * as Types from './constants';
var initialState = {
  lst: null,
  msg: '',
  type: '',
  count: 0
};

const employee = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_EMPLOYEE:
      return state
    case Types.FETCH_EMPLOYEE_SUCCESS:
      {
        state.msg = ''
        state.type = ''
        state.lst = action.listEmployee
        return state
      }
    case Types.FETCH_EMPLOYEE_FAIL:
      return action.msg

    case Types.ADD_EMPLOYEE:
      return state
    case Types.ADD_EMPLOYEE_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.unshift(action.response.employee[0])
        return state
      }
    case Types.ADD_EMPLOYEE_FAIL:
      {
        console.log(action);
        
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }

    case Types.DELETE_EMPLOYEE:
      return state
    case Types.DELETE_EMPLOYEE_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.id === action.response.employeeid) {
            state.lst[i].status = action.response.status            
          }
        })
        return state
      }
    case Types.DELETE_EMPLOYEE_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }

    case Types.UPDATE_EMPLOYEE:
      return state
    case Types.UPDATE_EMPLOYEE_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.id === action.response.employee.id) {
            state.lst[i] = action.response.employee            
          }
        })
        return state
      }
    case Types.UPDATE_EMPLOYEE_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }

    default:
      return state
  }
};


export default employee;    