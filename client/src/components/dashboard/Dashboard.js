import React,{Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DashboardAction from './DashboardAction'
import Experience from './Experience'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import Education from './Education'

const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile, loading}})=> {
    useEffect(() => {
        getCurrentProfile()
    },[getCurrentProfile])

    return loading && profile === null ? <Spinner/>: <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className= "lead">
    <i className="fas fa-user"></i>Welcome {user && user.name}</p>
    {profile!==null?
    <Fragment>
        <DashboardAction/>
        <Experience experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className='my-2'>
            <button className='btn btn-danger'onClick={()=>deleteAccount()}>
                <i className='fas fa-user-minus'>Delete My Account</i>
            </button>
        </div>
    </Fragment>:
    <Fragment>
    <p>
        No profile found, Please add some info
    </p>
    <Link to = '/create-profile' className="btn btn-primary my-1">CREATE PROFILE</Link>
    </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
    profile: state.profile,
    deleteAccount:PropTypes.func.isRequired
})


export default connect(mapStateToProps,{deleteAccount,getCurrentProfile}) (Dashboard)
