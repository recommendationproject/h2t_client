import * as Types from './constants';

// fetch order
export const fetchOrder = (partnerId) => {
    return {
        type : Types.FETCH_ORDER,
        partnerId
    }
}

export const fetchOrderSuccess = (listOrder) => {
    return {
        type : Types.FETCH_ORDER_SUCCESS,
        listOrder
    }
}

export const fetchOrderFail = (msg) => {
    return {
        type : Types.FETCH_ORDER_FAIL,
        msg
    }
}

// Update Order
export const updateOrder = (orderid, status) => {
    return {
        type : Types.UPDATE_ORDER,
        orderid,
        status
    }
}

export const updateOrderSuccess = (response) => {
    return {
        type : Types.UPDATE_ORDER_SUCCESS,
        response
    }
}

export const updateOrderFail = (response) => {
    return {
        type : Types.UPDATE_ORDER_FAIL,
        response
    }
}