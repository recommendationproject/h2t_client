import * as Types from './constants';

// fetch supply
export const fetchSupply = () => {
    return {
        type : Types.FETCH_SUPPLY
    }
}

export const fetchSupplySuccess = (listSupply) => {
    return {
        type : Types.FETCH_SUPPLY_SUCCESS,
        listSupply
    }
}

export const fetchSupplyFail = (msg) => {
    return {
        type : Types.FETCH_SUPPLY_FAIL,
        msg
    }
}

// Add Supply
export const addSupply = (supply) => {
    return {
        type : Types.ADD_SUPPLY,
        supply
    }
}

export const addSupplySuccess = (response) => {
    return {
        type : Types.ADD_SUPPLY_SUCCESS,
        response
    }
}

export const addSupplyFail = (response) => {
    return {
        type : Types.ADD_SUPPLY_FAIL,
        response
    }
}

// Delete Supply
export const deleteSupply = (supplyId) => {
    return {
        type : Types.DELETE_SUPPLY,
        supplyId
    }
}

export const deleteSupplySuccess = (response) => {
    return {
        type : Types.DELETE_SUPPLY_SUCCESS,
        response
    }
}

export const deleteSupplyFail = (response) => {
    return {
        type : Types.DELETE_SUPPLY_FAIL,
        response
    }
}

// Update Supply
export const updateSupply = (supply) => {
    return {
        type : Types.UPDATE_SUPPLY,
        supply
    }
}

export const updateSupplySuccess = (response) => {
    return {
        type : Types.UPDATE_SUPPLY_SUCCESS,
        response
    }
}

export const updateSupplyFail = (response) => {
    return {
        type : Types.UPDATE_SUPPLY_FAIL,
        response
    }
}