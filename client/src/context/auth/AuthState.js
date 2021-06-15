import React, { useReducer } from 'react';
import axios from "axios"
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from "../../utils/setAuthToken"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

function AuthState(props) {
  const initialState = {
    //   The token will be stored in localStorage
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  
  const [state, dispatch] = useReducer(authReducer, initialState)
//  Load user
const loaduser = async ()=> {
 if(localStorage.token) {
   setAuthToken(localStorage.token)
 }
  try {
    const res = await axios.get("/api/auth");

    dispatch({type: USER_LOADED,
    payload: res.data})
    
  } catch (err) {
    dispatch({type: AUTH_ERROR})
    
  }
} 

//  Register user
const register = async formData => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const res = await axios.post("/api/users", formData, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    loaduser(); 
  } catch(err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    }) 

  }
}
//  Login user
const login = async formData => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const res = await axios.post("/api/auth", formData, config)
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data
    });
    
    loaduser(); 
  } catch(err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    }) 

  }
}
//  Logout
const logout = ()=> dispatch({type: LOGOUT})
//  Clear errors
const clearErrors = ()=> dispatch({type: CLEAR_ERRORS})
 
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loaduser,
        login,
        logout,
        clearErrors
      }}
    >
    
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthState;
