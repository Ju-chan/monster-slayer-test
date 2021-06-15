import {
REGISTER_SUCCESS, 
REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR, 
LOGIN_SUCESS, 
LOGIN_FAIL, 
LOGOUT, 
CLEAR_ERRORS

} from "../types";
export default (state, action)=> {
    switch(action.type) {
        case USER_LOADED:
        return {
            ...state, 
            isAuthenticated: true,
            loading: false,
            user: action.payload
        }
        case REGISTER_SUCCESS:
        // LOGIN_SUCESSS AND REGISTER_SUCESS both have tokens and isAuthenticated
        case LOGIN_SUCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };

            case REGISTER_FAIL:
            // If there is an authentication or login error, it will remove token, etc. 
            case AUTH_ERROR:
            case LOGIN_FAIL:
            // The same applies to logging out
            case LOGOUT:
                localStorage.removeItem("token");
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false, 
                    loading: false,
                    user: null,
                    error: action.payload
                }
                case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
            default:
                return state;

    }
}