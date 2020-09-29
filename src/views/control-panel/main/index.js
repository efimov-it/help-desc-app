import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import DashboardCard from '../../../components/dashboard-card'
import ApplicationsView from '../../../components/applications-view'
import './index.scss'

class ControlPanelMain extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            applicationsCount: 0
        }
    }

    componentDidMount () {
        global.sendRequest({
            url: '/applications/my/count/',
            headers: {
                token: this.props.user.token
            }
        })
        .then(resp=>{
            const {count} = resp
            const updater = () => {
                if (this.state.applicationsCount < count) {
                    const currentCount = this.state.applicationsCount
                    let step = (count > 200 ? 50 : (count > 10 ? 3 : 1))
                    const end = count - currentCount
                    step = end < step ? end : step
                    setTimeout(()=>{
                        this.setState({
                            applicationsCount: currentCount + step
                        }, updater)
                    }, 50)
                }
            }
            updater()
        })
        .catch(err=>{
            this.props.createResultModal(err, 'error')
        })
    }

    logOut (e) {
        e.preventDefault()
        this.props.logout()
        this.props.setGuestMenu()
        this.props.history.push('/')
    }

    render () {
        const {
            user
        } = this.props
        const userData = user.data
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
                        <div className="dashboardUser">
                            <div className="dashboardUser_text">
                                <p className="dashboardUser_fullname">
                                    {userData.fullName}
                                </p>
                                <p className="dashboardUser_post">
                                    {userData.post}
                                </p>
                            </div>
                            <button
                                className="dashboardUser_button material-icons"
                                title="Выйти из аккаунта"
                                onClick={(e)=>this.logOut.apply(this, [e])}
                            >
                                input
                            </button>
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        gradientFrom="#ff9f01"
                        gradientTo="#ff5822"
                        icon="assignment"
                        title="Мои заявки"
                        to="/control-panel/applications/"
                    >
                        <div className="dashboardApplications">
                            <div className="dashboardApplications_counter">
                                {this.state.applicationsCount}
                            </div>
                            <p className="dashboardApplications_text">
                                Мои заявки
                            </p>
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        gradientFrom="#465b66"
                        gradientTo="#5c6bbf"
                        icon="settings"
                        title="Настройки приложения"
                        to="/control-panel/settings/"
                    >
                        <div className="dashboardSettings">
                            <div className="dashboardSettings_header">
                                Настройки
                            </div>
                            <div className="dashboardSettings_text">
                                Уведомления, PWA, данные
                            </div>
                        </div>
                    </DashboardCard>
                </div>

                <ApplicationsView
                    token={user.token}
                    state="created"
                />
            </>
        )
    }
}

export default connect(
    mapStateToProps('controlPanelMain'),
    mapDispatchToProps('controlPanelMain')
)(withRouter(ControlPanelMain))