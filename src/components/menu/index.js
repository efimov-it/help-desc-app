import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import './index.scss'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false
        }
        this.menuClose = this.menuClose.bind(this);
    }

    menuClose () {
        this.setState({
            isHidden: true
        },()=>{
            setTimeout(()=>{
                this.props.setMenuState(false)
                this.setState({
                    isHidden: false
                })
            }, 150)
        })
    }

    showAuth () {
        this.props.createModal({
            header: 'Авторизация',
            content: this.props.authView
        })
    }

    render () {
        return (
            this.props.menu.isShown ?
                <div className="menu_wrapper">
                    <div className={'menu_background ' + (this.state.isHidden ? 'menu_background__hidden' : '')}
                        onClick={this.menuClose} />
                    <nav className={'menu ' + (this.state.isHidden ? 'menu__hidden' : '')}>
                        <header className="menu_header">
                            <h2 className="menu_title">
                                Меню
                            </h2>
                            <button className="menu_close"
                                    title="Закрыть меню"
                                    onClick={this.menuClose} />
                        </header>
                        <div className="menu_user">
                            <div className="menu_user-img material-icons">
                                person
                            </div>
                            <div className="menu_user-text">
                                Аккаунт ТЕХ. ПОДДЕРЖКИ
                            </div>
                            <button className="menu_user-log material-icons"
                                    title="Войти в аккаунт"
                                    onClick={()=>this.showAuth.apply(this)}>
                                input
                            </button>
                        </div>

                        <ul className="menu_items-list">
                            {this.props.menu.items.map((item, key) => (
                                <li className="menu_items-list-item"
                                    onClick={()=>{this.menuClose(); item.event()}}
                                    key={key}>
                                    <i className="material-icons">{item.icon}</i>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            : ''
        )
    }
}

export default connect(
    mapStateToProps('menu'),
    mapDispatchToProps('menu')
)(Menu)