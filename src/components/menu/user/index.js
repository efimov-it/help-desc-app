import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './index.scss'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import Auth from '../../../views/auth'

class MenuUser extends React.Component {

    showAuth () {
        this.props.setMenuState(false)
        this.props.createModal({
            header: 'Авторизация',
            content: Auth
        })
    }

    goToProfile() {
        this.props.setMenuState(false)
        this.props.history.push('/control-panel/profile/')
    }

    logout() {
        this.props.setMenuState(false)
        this.props.logout()
        this.props.setGuestMenu()
    }

    render () {
        const {user} = this.props
        return (
            <div className="menuUser">
                <div className="menuUser-img material-icons">
                    person
                </div>
                <div
                    className="menuUser-text"
                    onClick={user.fullName !== null ? ()=>this.goToProfile.apply(this) : ()=>{}}
                    title={user.fullName !== null ? "Перейти в профиль пользователя" : ()=>{}}
                >
                    {
                        user.fullName === null ?
                        "Аккаунт ТЕХ. ПОДДЕРЖКИ" :
                        <>
                            <div className="menuUser-text_fullName">
                                {user.fullName}
                            </div>
                            <div className="menuUser-text_post">
                                {user.role === 0 ? "Администратор" : 
                                                   user.role === 1 ? "Модератор" :
                                                                     "Пользователь"}
                            </div>
                        </>
                    }
                </div>
                <button
                    className="menuUser-log material-icons"
                    title={user.fullName === null ? "Войти в аккаунт" : "Выйти из аккаунта"}
                    onClick={user.fullName === null ? ()=>this.showAuth.apply(this) : ()=>this.logout.apply(this)}
                >
                    input
                </button>
            </div>
        )
    }
}

export default connect(
    mapStateToProps('menuUser'),
    mapDispatchToProps('menuUser')
)(withRouter(MenuUser))