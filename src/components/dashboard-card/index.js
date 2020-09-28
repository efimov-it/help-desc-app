import React, { Children } from 'react'
import './index.scss'

export default class DashboardCard extends React.Component {
    render () {
        return (
            <div
                className="dashboard-card"
                style={{
                    boxShadow: `0px 20px 30px ${this.props.gradientTo}77`,
                    background: `linear-gradient(90deg,${this.props.gradientFrom}, ${this.props.gradientTo})`
                }}
            >
                <div className="dashboard-card_icon material-icons">{this.props.icon}</div>
                {/* <Children /> */}
            </div>
        )
    }
}