import * as Types from './constants';

// fetch wh
export const fetchWh = () => {
    return {
        type : Types.FETCH_WH
    }
}

export const fetchWhSuccess = (listWh) => {
    return {
        type : Types.FETCH_WH_SUCCESS,
        listWh
    }
}

export const fetchWhFail = (msg) => {
    return {
        type : Types.FETCH_WH_FAIL,
        msg
    }
}

// Add Wh
export const addWh = (wh) => {
    return {
        type : Types.ADD_WH,
        wh
    }
}

export const addWhSuccess = (response) => {
    return {
        type : Types.ADD_WH_SUCCESS,
        response
    }
}

export const addWhFail = (response) => {
    return {
        type : Types.ADD_WH_FAIL,
        response
    }
}

// Delete Wh
export const deleteWh = (whId) => {
    return {
        type : Types.DELETE_WH,
        whId
    }
}

export const deleteWhSuccess = (response) => {
    return {
        type : Types.DELETE_WH_SUCCESS,
        response
    }
}

export const deleteWhFail = (response) => {
    return {
        type : Types.DELETE_WH_FAIL,
        response
    }
}

// Update Wh
export const updateWh = (wh) => {
    return {
        type : Types.UPDATE_WH,
        wh
    }
}

export const updateWhSuccess = (response) => {
    return {
        type : Types.UPDATE_WH_SUCCESS,
        response
    }
}

export const updateWhFail = (response) => {
    return {
        type : Types.UPDATE_WH_FAIL,
        response
    }
}