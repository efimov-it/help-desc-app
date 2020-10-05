import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'

import ApplicationsView from '../../../components/applications-view'
import ApplicationPage from './aplication-page'

class Applications extends React.Component {
    render () {
        const {user} = this.props
        return (
            <Switch>
                <Route
                    path="/control-panel/applications/"
                    exact
                >
                    <ApplicationsView
                        token={user.token}
                        state="processing"
                    />
                </Route>
                <Route 
                    path="/control-panel/applications/:key"
                >
                    <ApplicationPage />
                </Route>
            </Switch>
        )
    }
}

export default connect(
    mapStateToProps('myApplication'),
    mapDispatchToProps('myApplication')
)(Applications)