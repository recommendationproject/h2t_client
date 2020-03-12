import * as Types from './constants';

var initialState = null;

const product = (state = initialState, action) => {

  switch (action.type) {
    case Types.ADMIN_SIGNIN:
      return state
    case Types.ADMIN_SIGNIN_SUCCESS:
      return action.token
    case Types.ADMIN_SIGNIN_FAIL:
      return action.msg

    default:
      return state
  }
};


export default product;    