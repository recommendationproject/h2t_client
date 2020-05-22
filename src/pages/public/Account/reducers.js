import * as Types from './constants';
var initialState = null;

const user = (state = initialState, action) => {

  switch (action.type) {
    // Sign in
    case Types.USER_SIGNIN:
      return state
    case Types.USER_SIGNIN_SUCCESS:
      return action.token
    case Types.USER_SIGNIN_FAIL:
      return action.msg
    //
    case Types.MLTS:
      return action.admin

    case Types.SIGN_OUT:
      return null

    default:
      return state
  }
};


export default user;    