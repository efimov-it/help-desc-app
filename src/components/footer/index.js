import React from 'react'
import {Link} from 'react-router-dom'

import './index.scss'

export default class Footer extends React.Component{
    render () {
        return (
            <footer className="footer" >
                <a className="footer_link link link__white"
                    href="https://stankin.ru/"
                    target="_blank"
                    rel="noopener noreferrer">
                        МГТУ "Станкин" © {new Date().getFullYear()}
                </a>
                {/* <Link className="footer_link link link__white"
                        to="/license/">
                        Лицензионное соглашение
                </Link> */}
                <a className="footer_link link link__white"
                    style={{fontSize: '14px'}}
                    href="https://github.com/efimov-it/"
                    target="_blank"
                    rel="noopener noreferrer">
                        Разработка
                </a>
            </footer>
        )
    }
}