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

//////// update image
export const updateImage = (admin) => {
    return {
        type : Types.ADMIN_CHANGE_IMAGE,
        admin
    }
}

export const updateImageSuccess = (link) => {
    return {
        type : Types.ADMIN_CHANGE_IMAGE_SUCCESS,
        link
    }
}

export const updateImageFail = (msg) => {
    return {
        type : Types.ADMIN_CHANGE_IMAGE_FAIL,
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

///////// signout
export const signout = () => {
    return {
        type : Types.SIGN_OUT
    }
}

