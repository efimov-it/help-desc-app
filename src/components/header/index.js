import React from 'react'
import {Link} from 'react-router-dom'

import './index.scss'
import LogoImg from '../../assets/ui/logo-200.png'

export default class Header extends React.Component {
    render () {
        return (
            <header className="header">
                <button className="header_menu-button"
                        onClick={this.props.menuClick}
                        title="Главное меню" />
                <div className="header_logo">
                    <Link title="На главную"
                          to="/">
                        <img className="header_logo-img"
                            src={LogoImg}
                            alt="Логотип университета" />
                        <span className="header_logo-text">
                            Техническая поддержка
                        </span>
                    </Link>
                </div>
                <a className="header_university-link link link__grey"
                   href="https://stankin.ru/"
                   target="_blank"
                   rel="noopener noreferrer"
                   title="Открыть в новой вкладке">
                    Официальный сайт "МГТУ "Станкин"
                </a>
            </header>
        )
    }
}