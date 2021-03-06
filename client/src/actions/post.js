import axios from 'axios'
import setAlert from './alert'
import { GET_POSTS, ADD_COMMENT, REMOVE_COMMENT, GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST} from './types'

//Get GET_POSTS
export const getPosts = ()=>async dispatch =>{
        try {
            const res = await axios.get('/api/post')
            dispatch({
                type:GET_POSTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type:POST_ERROR,
                payload:{msg:err.response.statusText, status:err.response.status}
            })
        }
}
//Get GET_POST
export const getPost = id =>async dispatch =>{
    try {
        const res = await axios.get(`/api/post/${id}`)
        dispatch({
            type:GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
//Add Like
export const addLike = id =>async dispatch =>{
    try {
        const res = await axios.put(`/api/post/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
//Remove Like
export const removeLike = id =>async dispatch =>{
    try {
        const res = await axios.put(`/api/post/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
//Delete Post
export const deletePost = id =>async dispatch =>{
    try {
         await axios.delete(`/api/post/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert('Post Has been Deleted','success'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
//ADD Post
export const addPost = formData =>async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
         const res = await axios.post('/api/post',formData, config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post Created','success'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
//ADD Comment
export const addComment = (postId,formData) =>async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
         const res = await axios.post(`/api/post/comment/${postId}`,formData, config)
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert('Comment Added','success'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}
//Delete Comment
export const removeComment = (postId,commentId) =>async dispatch =>{
    try {
         await axios.delete(`/api/post/comment/${postId}/${commentId}`)
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        })
        dispatch(setAlert('Comment Removed','success'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}