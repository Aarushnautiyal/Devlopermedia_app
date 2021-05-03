import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/*i destructures the props and get alerts out of it so 
    i don't have to use props.alerts all the time*/

const Alert = ({alerts}) => 
alerts!== null && 
alerts.length > 0  && 
alerts.map(alert =>(
    <div key = {alert.id} className = {`alert alert-${alert.alertType}`} >
        {alert.msg}
    </div>
))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state =>({
    alerts: state.alert
})

export default connect(mapStateToProps) (Alert)
