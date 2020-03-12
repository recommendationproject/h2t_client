import * as Types from './constants';

// fetch product
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

