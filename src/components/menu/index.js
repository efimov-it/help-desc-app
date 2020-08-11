import React from 'react'

import './index.scss'

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: props.menuItems,
            isHide: false
        }
        this.menuClose = this.menuClose.bind(this);
    }

    menuClose () {
        this.setState({
            isHide: true
        })
        setTimeout(()=>{
            this.props.closeMenu()
        }, 150)
    }

    render () {
        return (
            <div className="menu_wrapper">
                <div className={'menu_background ' + (this.state.isHide ? 'menu_background__hidden' : '')}
                     onClick={this.menuClose} />
                <nav className={'menu ' + (this.state.isHide ? 'menu__hidden' : '')}>
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
                                title="Войти в аккаунт">
                            input
                        </button>
                    </div>

                    <ul className="menu_items-list">
                        {this.state.menuItems.map((item, key) => (
                            <li className="menu_items-list-item"
                                onClick={item.event}
                                key={key}>
                                <i className="material-icons">{item.icon}</i>
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        )
    }
}