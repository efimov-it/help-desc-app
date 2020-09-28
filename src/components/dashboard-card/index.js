import React, { Children } from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

export default class DashboardCard extends React.Component {
    render () {
        return (
            <Link
                to={this.props.to}
                className="dashboard-card"
                title={this.props.title}
                style={{
                    boxShadow: `0px 20px 30px ${this.props.gradientTo}77`,
                    background: `linear-gradient(90deg,${this.props.gradientFrom}, ${this.props.gradientTo})`
                }}
            >
                <div className="dashboard-card_icon material-icons">{this.props.icon}</div>
                {/* <Children /> */}
            </Link>
        )
    }
}