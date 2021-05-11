import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getGithubRepos} from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithub = ({repos,getGithubRepos,username}) => {
    useEffect(()=>{
        getGithubRepos(username)
    },[getGithubRepos(username)])
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repos</h2>
            {repos === null ? <Spinner></Spinner>:(
                repos.map(repo=>(
                    <div key ={repo._id} className='repo bg-white p-1 my-1'>
                        <div>
                            <h4>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                                </a>
                            </h4>
                <p>{repo.description}</p>
                        </div>
                        <ul>
                <li className='badge badge-light'>Fork: {repo.forks_count}</li>
                        </ul>
                    </div>
                ))
    )}
        </div>
    )
}

ProfileGithub.propTypes = {
    repos: PropTypes.array.isRequired,
    getGithubRepos: PropTypes.func.isRequired,
    username : PropTypes.string.isRequired
}
const mapStateToProps = state =>({
    repos: state.profile.repos
})

export default connect(mapStateToProps,{getGithubRepos}) (ProfileGithub)
