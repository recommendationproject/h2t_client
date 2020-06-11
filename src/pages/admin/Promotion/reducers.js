import * as Types from './constants';
var initialState = {
  lst: [],
  msg: '',
  type: '',
  count: 0
};

const order = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_ORDER:
      return state
    case Types.FETCH_ORDER_SUCCESS:
      {        
        state.lst = action.listOrder        
        return state
      }
    case Types.FETCH_ORDER_FAIL:
      return action.msg
    //
    case Types.UPDATE_ORDER:
      return state
    case Types.UPDATE_ORDER_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.find((e, i) => {          
          if (e.orderid === action.response.order[0].orderid) {            
            state.lst[i] = action.response.order[0]
          }
        })
        return state
      }
    case Types.UPDATE_ORDER_FAIL:
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


export default order;    