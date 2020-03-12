import * as Types from './constants';
var initialState = null;

const product = (state = initialState, action) => {

  switch (action.type) {

    case Types.FETCH_SOURCEOFITEMS:
      return state
    case Types.FETCH_SOURCEOFITEMS_SUCCESS:
      return action.items
    case Types.FETCH_SOURCEOFITEMS_FAIL:
      return state

    case Types.ADD_SOURCEOFITEMS:
      return state
    case Types.ADD_SOURCEOFITEMS_SUCCESS:
      return state
    case Types.ADD_SOURCEOFITEMS_FAIL:
      return state

    default:
      return state
  }
};


export default product;    