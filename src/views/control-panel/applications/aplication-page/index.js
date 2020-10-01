import React from 'react'
import {withRouter} from 'react-router-dom'

class ApplicationPage extends React.Component {
    render () {
        return this.props.match.params.key
    }
}

export default withRouter(ApplicationPage)