import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import {getPost} from '../../actions/post'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import PostItem from '../posts/PostItem'
import { Fragment } from 'react'
import {Link} from 'react-router-dom'

const Post = ({getPost, post:{loading,post}, match}) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost])
    return (
            loading ? <Spinner/>: <Fragment>
                <Link to ='/posts' className='btn'>Go Back</Link>
                <PostItem post ={post} showActions = {false}/>
                <CommentForm postId = {post._id} />
                <div className='comments'>
                    {post.comments.map(comment=>(
                        <CommentItem key={comment._id} comment = {comment} postId ={post._id} />
                    ))}
                </div>
            </Fragment>     
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    post : state.post
})

export default connect(mapStateToProps, {getPost}) (Post)
