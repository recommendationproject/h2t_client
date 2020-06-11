import * as Types from './constants';

// Fetch SourceOfItems
export const fetchSourceOfItems = (partnerId) => {
    return {
        type : Types.FETCH_SOURCEOFITEMS,
        partnerId
    }
}

export const fetchSourceOfItemsSuccess = (items) => {
    return {
        type : Types.FETCH_SOURCEOFITEMS_SUCCESS,
        items
    }
}

export const fetchSourceOfItemsFail = (msg) => {
    return {
        type : Types.FETCH_SOURCEOFITEMS_FAIL,
        msg
    }
}

// Add SourceOfItems
export const addSourceOfItems = (item) => {
    return {
        type : Types.ADD_SOURCEOFITEMS,
        item
    }
}

export const addSourceOfItemsSuccess = (response) => {
    return {
        type : Types.ADD_SOURCEOFITEMS_SUCCESS,
        response
    }
}

export const addSourceOfItemsFail = (response) => {
    return {
        type : Types.ADD_SOURCEOFITEMS_FAIL,
        response
    }
}