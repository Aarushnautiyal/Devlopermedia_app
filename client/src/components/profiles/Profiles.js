import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getProfiles} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { withRouter } from 'react-router-dom'

const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    useEffect(() => {
            getProfiles()
    }, [getProfiles]) 
    return (
        <Fragment>
            {loading? <Spinner/>:<Fragment>
                <h1 className="large text-primary">Devlopers</h1>
                <p className="lead">
                    <i className='fab fa-connectdevelop'></i> Browse and connect with the devlopers around the globe
                </p>
                <div className='profiles'>
                    {profiles.length > 0 ? (
                        profiles.map(profile=>(
                            <ProfileItem key={profile._id} profile={profile}></ProfileItem>
                        ))
                    ) :<Spinner/>}
                </div>
                </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile
})

export default connect(mapStateToProps,{getProfiles}) (withRouter(Profiles))
