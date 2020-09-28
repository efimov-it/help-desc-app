import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import MenuUser from './user'

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

    menuItemsEvent (event) {
        this.props.setMenuState(false)
        switch(event.type) {
            case 'modal' :
                this.props.createModal(event.modal)
            break

            case 'url' :
                this.props.history.push(event.url)
            break

            default:

            break
        }
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

                        <MenuUser />

                        <ul className="menu_items-list">
                            {this.props.menu.items.map((item, key) => (
                                <li className="menu_items-list-item"
                                    onClick={()=>{this.menuItemsEvent.apply(this, [item.event])}}
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
)(withRouter(Menu))