import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'

import Checkbox from '../../components/checkbox'
import Switcher from '../../components/switcher'
import ChatBackgroundPicker from '../../components/chatBackgroundPicker'
import './index.scss'

import chatBackground from '../../settings/chat-backgrounds.json'
import initialSettings from '../../settings/initial-settings.json'

class Settings extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            ...initialSettings
        }
    }
    render () {
        return (
            <div className={!this.props.user.token ? 'page' : ''}>
                {
                    !this.props.user.token ? <h2 className="settings_header">Настройки</h2> : ''
                }
                <div className="page_block settings_list">
                    <div className="settings_group">
                        <h2 className="settings_title">Заявки</h2>
                        <div className="settings_item settings_switcher">
                            <span>Строчный вид</span>
                            <Switcher
                            
                            />
                            <span>Карточный вид</span>
                        </div>
                    </div>
                    <div className="settings_group">
                        <h2 className="settings_title">PWA</h2>
                        <label className="settings_item settings_checkbox">
                            <Checkbox
                            
                            /> <span>Разрешить присылать уведомления</span>
                        </label>
                        <label className="settings_item settings_checkbox">
                            <Checkbox
                            
                            /> <span>Установить как приложение</span>
                        </label>
                    </div>
                    <div className="settings_group">
                        <h2 className="settings_title">Оформление</h2>
                        <div className="settings_item">
                            <ChatBackgroundPicker
                                backgroundsList={chatBackground}
                                selectedName={this.state.apperance.chatBackground ? this.state.apperance.chatBackground : "moscow"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps('settings'),
    mapDispatchToProps('settings')
)(Settings)