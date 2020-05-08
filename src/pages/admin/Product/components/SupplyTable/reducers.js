import * as Types from './constants';
var initialState = {
  lst: null,
  msg: '',
  type: '',
  count: 0
};

const supply = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_SUPPLY:
      {        
        state.msg = ''
        state.type = ''
        state.count = 0;
        return state
      }
    case Types.FETCH_SUPPLY_SUCCESS:
      {        
        state.msg = ''
        state.type = ''
        state.count = 0;
        state.lst = action.listSupply
        return state
      }
    case Types.FETCH_SUPPLY_FAIL:
      return action.msg

    case Types.ADD_SUPPLY:
      return state
    case Types.ADD_SUPPLY_SUCCESS:
      {        
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.push(action.response.supply[0])
        return state
      }
    case Types.ADD_SUPPLY_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }

    case Types.DELETE_SUPPLY:
      return state
    case Types.DELETE_SUPPLY_SUCCESS:
      {        
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.id === action.response.supplyId) {
            state.lst.splice(i, 1);
          }
        })
        return state
      }
    case Types.DELETE_SUPPLY_FAIL:
      {
        state.count++;
        state.msg = 'Không thể xóa ncc. Đã có lỗi xảy ra !'
        state.type = 'error'
        // eslint-disable-next-line
        return state
      }

    case Types.UPDATE_SUPPLY:
      return state
    case Types.UPDATE_SUPPLY_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.id === action.response.supply.id) {            
            state.lst[i] = action.response.supply
          }
        })
        return state
      }
    case Types.UPDATE_SUPPLY_FAIL:
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


export default supply;    