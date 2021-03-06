import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import setAlert from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types'

// load user
export const loadUser = () =>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

// REGISTER USER

export const register = ({name,email,password}) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})
    try {
        const res = await axios.post('/api/user', body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.console.errors

        if(errors){
            dispatch(setAlert(errors.msg,'danger'))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// LOGIN USER

export const login = (email,password) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email,password})
    try {
        const res = await axios.post('/api/auth', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (err) {
        
        dispatch(setAlert('Please check your email and password then try again ', 'danger'))

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch =>{
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
} 