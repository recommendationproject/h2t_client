import * as Types from './constants';

///////// signIn
export const signIn = (user) => {
    return {
        type : Types.USER_SIGNIN,
        user
    }
}

export const signInSuccess = (token) => {
    return {
        type : Types.USER_SIGNIN_SUCCESS,
        token
    }
}

export const signInFail = (msg) => {
    return {
        type : Types.USER_SIGNIN_FAIL,
        msg
    }
}

///////// update
export const update = (user) => {
    return {
        type : Types.USER_UPDATE,
        user
    }
}

export const updateSuccess = (response) => {
    return {
        type : Types.USER_UPDATE_SUCCESS,
        response
    }
}

export const updateFail = (response) => {
    return {
        type : Types.USER_UPDATE_FAIL,
        response
    }
}

///////// map localstorage to store
export const mlts = (admin) => {
    return {
        type : Types.MLTS,
        admin
    }
}

///////// signout
export const signout = () => {
    return {
        type : Types.SIGN_OUT
    }
}
