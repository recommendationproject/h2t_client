import * as Types from './constants';
var initialState = {
  lst: null,
  msg: '',
  type: '',
  count: 0
};

const wh = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_WH:
      {        
        state.msg = ''
        state.type = ''
        state.count = 0;
        return state
      }
    case Types.FETCH_WH_SUCCESS:
      {        
        state.msg = ''
        state.type = ''
        state.count = 0;
        state.lst = action.listWh
        return state
      }
    case Types.FETCH_WH_FAIL:
      return action.msg

    case Types.ADD_WH:
      return state
    case Types.ADD_WH_SUCCESS:
      {        
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        state.lst.push(action.response.wh[0])
        return state
      }
    case Types.ADD_WH_FAIL:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        return state
      }

    case Types.DELETE_WH:
      return state
    case Types.DELETE_WH_SUCCESS:
      {        
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.id === action.response.whId) {
            state.lst.splice(i, 1);
          }
        })
        return state
      }
    case Types.DELETE_WH_FAIL:
      {
        state.count++;
        state.msg = 'Không thể xóa ncc. Đã có lỗi xảy ra !'
        state.type = 'error'
        // eslint-disable-next-line
        return state
      }

    case Types.UPDATE_WH:
      return state
    case Types.UPDATE_WH_SUCCESS:
      {
        state.count++;
        state.msg = action.response.msg
        state.type = action.response.type
        // eslint-disable-next-line
        state.lst.find((e, i) => {
          if (e.id === action.response.wh.id) {            
            state.lst[i] = action.response.wh
          }
        })
        return state
      }
    case Types.UPDATE_WH_FAIL:
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


export default wh;    