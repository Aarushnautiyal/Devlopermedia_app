import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {getPosts} from '../../actions/post'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=>{
        getPosts()
    },[getPosts])
    return (
        <Fragment>
            {loading? <Spinner/>:(<Fragment>
                <h1 className=' large text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fas fa-user'> Welcome to the community</i>
                </p>
                <PostForm/>
                <div className='posts'>
                    {posts.map(post=>(
                        <PostItem key = {post._id} post={post}/>
                    ))}
                </div>
            </Fragment>)}
        </Fragment>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts}) (Posts)
