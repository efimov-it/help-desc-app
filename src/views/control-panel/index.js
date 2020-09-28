import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import {Switch, Route, withRouter} from 'react-router-dom'
import controlPanelRoutes from '../../routes/controlPanelRoutes'
import Breadcrumbs from '../../components/breadcrumbs'
import './index.scss'

class ControlPanel extends React.Component {
    componentDidMount () {
        if (this.props.user.token === null) {
            this.props.history.push('/')
        }
    }
    render () {
        return (
            <div className="page">
                <Breadcrumbs />
                <Switch>
                    {
                        controlPanelRoutes.map(({path, component}, i) => (
                            <Route
                                path={path}
                                component={component}
                                key={i}
                                exact={path === '/control-panel/'}
                            />
                        ))
                    }
                </Switch>
            </div>
        )
    }
}

export default connect(
    mapStateToProps('controlPanel'),
    mapDispatchToProps('controlPanel')
)(ControlPanel)