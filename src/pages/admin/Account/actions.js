import * as Types from './constants';

//////// update admin
export const updateAdmin = (admin) => {
    return {
        type : Types.UPDATE_ADMIN,
        admin
    }
}

export const updateAdminSuccess = (admin) => {
    return {
        type : Types.UPDATE_ADMIN_SUCCESS,
        admin
    }
}

export const updateAdminFail = (msg) => {
    return {
        type : Types.UPDATE_ADMIN_FAIL,
        msg
    }
}
///////// signIn
export const signIn = (user) => {
    return {
        type : Types.ADMIN_SIGNIN,
        user
    }
}

export const signInSuccess = (token) => {
    return {
        type : Types.ADMIN_SIGNIN_SUCCESS,
        token
    }
}

export const signInFail = (msg) => {
    return {
        type : Types.ADMIN_SIGNIN_FAIL,
        msg
    }
}

///////// map localstorage to store
export const mlts = (admin) => {
    return {
        type : Types.MLTS,
        admin
    }
}

