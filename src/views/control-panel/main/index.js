import React from 'react'
import {Link} from 'react-router-dom'
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
                        title="Перейти в профиль"
                        to="/control-panel/profile/"
                    >

                    </DashboardCard>
                    <DashboardCard
                        gradientFrom="#ff9f01"
                        gradientTo="#ff5822"
                        icon="assignment"
                        title="Мои заявки"
                        to="/control-panel/applications/"
                    >

                    </DashboardCard>
                    <DashboardCard
                        gradientFrom="#465b66"
                        gradientTo="#5c6bbf"
                        icon="settings"
                        title="Настройки приложения"
                        to="/control-panel/settings/"
                    >

                    </DashboardCard>
                </div>
            </>
        )
    }
}

export default ControlPanelMain