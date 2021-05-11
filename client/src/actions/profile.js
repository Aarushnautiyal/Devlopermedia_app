import axios from 'axios'
import setALert from './alert'
import{
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS
} from './types'

// get current profile

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// get Profiles

export const getProfiles = () => async dispatch =>{
    dispatch({
        type:CLEAR_PROFILE
    })
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
// get profile by id
export const getProfileById = userId => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// get githubrepos
export const getGithubRepos = username => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Create or Update Profile
 
export const createProfile = (formData, history, edit = false) => async dispatch=>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(
            setALert(edit?"Profile Updated": "Profile Created", 'success')
        )
        if(!edit){
            history.push('./dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error=>dispatch(
                setALert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Add education
export const addEducation = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(
            setALert("Education Added", 'success')
        )
            history.push('./dashboard')
    } catch (err) {
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error=>dispatch(
                setALert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}


// Add experience
export const addExperience = (formData, history) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(
            setALert("Experience Added", 'success')
        )
            history.push('./dashboard')
    } catch (err) {
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error=>dispatch(
                setALert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Delete  Experience

export const deleteExperience = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(
            setALert("Experience Deleted", 'success')
        )
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
// Delete an Education

export const deleteEducation = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(
            setALert("Education Deleted", 'success')
        )
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// Delete Account and profile
export const deleteAccount = id => async dispatch =>{
    if(window.confirm('Are you sure? Once deleted you will lose all your data')){
        try {
            await axios.delete(`/api/profile`)
            dispatch({
                type:CLEAR_PROFILE
            })
            dispatch({
                type:DELETE_ACCOUNT
            })
    
            dispatch(
                setALert("Account permanently Deleted", 'success')
            )
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText, status:err.response.status}
            })
        }
    }
}