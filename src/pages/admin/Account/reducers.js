import * as Types from './constants';
var initialState = null;

const admin = (state = initialState, action) => {

  switch (action.type) {
    // update partner
    case Types.UPDATE_ADMIN:
        return state;
    case Types.UPDATE_ADMIN_SUCCESS:
        {
          state.token.user= Object.assign(state.token.user, action.admin);
          localStorage.setItem('sessionadmin', JSON.stringify(state));
          return state
        }
    case Types.UPDATE_ADMIN_FAIL:
      return action.msg
    // Sign in
    case Types.ADMIN_SIGNIN:
      return state
    case Types.ADMIN_SIGNIN_SUCCESS:
      return action.token
    case Types.ADMIN_SIGNIN_FAIL:
      return action.msg
    //
    case Types.MLTS:
      return action.admin
    default:
      return state
  }
};


export default admin;    