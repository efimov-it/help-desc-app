import React from 'react'
import DashboardCard from '../../../components/dashboard-card'
import './index.scss'

class ControlPanelMain extends React.Component{
    render () {
        return (
            <>
                <div className="dashboard_cards">
                    <DashboardCard
                        gradientFrom="#03a9f4"
                        gradientTo="#00bcd5"
                        icon="person"
                    >

                    </DashboardCard>
                    <DashboardCard
                        gradientFrom="#ff9f01"
                        gradientTo="#ff5822"
                        icon="assignment"
                    >

                    </DashboardCard>
                    <DashboardCard
                        gradientFrom="#465b66"
                        gradientTo="#5c6bbf"
                        icon="settings"
                    >

                    </DashboardCard>
                </div>
            </>
        )
    }
}

export default ControlPanelMain