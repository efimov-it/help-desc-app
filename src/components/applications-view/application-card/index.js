import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import './index.scss'

import ApplicationEnd from '../application-end'
import ApplicationSetExecutor from '../application-setExecutor'
import ApplicationGet from '../application-get'
import LoadingIndicator from '../../loadingIndicator'

class ApplicationCard extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            newMessage: '',
            messages: [],
            stringEventsMode: false
        }
    }

    changeEventsVisible () {
        this.setState({
            stringEventsMode: !this.state.stringEventsMode
        })
    }

    endApplication () {
        const applicationCode = this.props.data.application_code
        this.props.createModal({
            header: 'Завершение заявки #' + applicationCode,
            content: ApplicationEnd,
            data: {
                applicationCode,
                token: this.props.user.token,
                onSubmit: () => {
                    this.changeApplicationState()
                }
            }
        })
    }

    setApplicationExecutor () {
        const applicationCode = this.props.data.application_code
        this.props.createModal({
            header: 'Назначить исполнителя для #' + applicationCode,
            content: ApplicationSetExecutor,
            data: {
                applicationCode,
                token: this.props.user.token,
                onSubmit: () => {
                    this.changeApplicationState()
                }
            }
        })
    }

    getApplication () {
        const applicationCode = this.props.data.application_code
        const getApplicationRequest = () => {
            this.props.createModal({
                content: LoadingIndicator
            })
            global.sendRequest({
                url: '/applications/addToMy/',
                headers: {
                    token: this.props.user.token
                },
                method: 'post',
                data: 'key=' + applicationCode
            })
            .then(resp=>{
                this.props.closeModal()
                this.props.closeModal()
                this.props.createResultModal('Заявка успешно добавлена в список "Мои заявки"', 'success')
                this.changeApplicationState()
            })
            .catch(err=>{
                this.props.closeModal()
                this.props.createResultModal(err, 'error')
            })
        }
        this.props.createModal({
            header: 'Заявка #' + applicationCode,
            content: ApplicationGet,
            data: {
                applicationCode,
                token: this.props.user.token,
                onSubmit: getApplicationRequest
            }
        })
    }

    changeApplicationState () {
        this.props.onApplicationStateChange()
    }

    changeNewMessage (e) {
        this.setState ({
            newMessage: e.target.value
        })
    }

    sendMessage (e) {
        e.preventDefault()
        e.persist()
        const message = this.state.newMessage
        this.setState({
            newMessage: ''
        })
        if (message !== '') {
            global.sendRequest({
                url: '/applications/message/',
                method: 'post',
                headers: {
                    token: this.props.user.token
                },
                data: 'key=' + this.props.data.application_code + '&message=' + message
            })
            .then(resp=>{
                const {messages} = this.state
                messages.push({
                    text: message,
                    date: new Date()
                })
                this.setState({
                    messages
                })
            })
            .catch(err=>{
                this.props.createResultModal(err, 'error')
            })
        }
    }

    render () {
        const {data, user} = this.props
        const userData = user.data
        return (
            <div className={"application " + this.props.className + (this.props.viewMode !== 'blocks' ? ' application__strings' : '')}>
                <div className="application_code">
                    {data.application_code}
                </div>
                <div className="application_info">
                    <table className="application_infoTable">
                        <tbody>
                            <tr>
                                <td>Заявитель:</td>
                                <td>{data.full_name}</td>
                            </tr>
                            <tr>
                                <td>Телефон:</td>
                                <td>
                                    <a
                                        className="link"
                                        href={"tel:"+data.phone_number}
                                    >
                                        {data.phone_number}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Тип телефона:</td>
                                <td>{data.phone_type === 0 ? 'Внутренний' : 'Внешний'}</td>
                            </tr>
                            <tr>
                                <td>Эл. почта:</td>
                                <td>
                                    <a
                                        className="link"
                                        href={"mailto:"+data.mail}
                                    >
                                        {data.mail}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Отдел:</td>
                                <td>{data.dept}</td>
                            </tr>
                            <tr>
                                <td>Подразделение:</td>
                                <td>{data.unit}</td>
                            </tr>
                            <tr>
                                <td>Кабинет:</td>
                                <td>{data.office}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {
                    this.props.viewMode !== 'blocks' ?
                        <div className="application_text">
                            <p className="application_textTitle">Текст заявки:</p>
                            {data.application_text}
                        </div> : ''
                }

                <div className="application_messages">
                    <div className="application_messageWrapper">
                        <div className="application_message">
                            <div className="application_messageText">
                                {data.application_text}
                            </div>
                            <div className="application_messageDate">
                                {new Date(data.date).toLocaleTimeString(global.lang) + ' ' +
                                new Date(data.date).toLocaleDateString(global.lang)}
                            </div>
                        </div>
                    </div>

                    <div className="application_messageWrapper">
                        {
                            data.last_message !== null ?
                                <div className="application_message application_message__auth">
                                    <div className="application_messageOwner">
                                        {data.last_message.full_name + " (" + 
                                            (data.last_message.user_type === 0 ? 'Администратор' : data.last_message.user_type === 1 ? 'Модератор' : 'Сотрудник') +
                                            ")"}
                                    </div>
                                    <div className="application_messageText">
                                        {data.last_message.text}
                                    </div>
                                    <div className="application_messageDate">
                                        {
                                            new Date(data.last_message.date).toLocaleTimeString(global.lang) + ' ' +
                                            new Date(data.last_message.date).toLocaleDateString(global.lang)
                                        }
                                    </div>
                                </div>
                            : ''
                        }
                        {
                            this.state.messages.map((message, i) => {
                                const tmpDate = data.last_message ? data.last_message.date : 0
                                return message.date.getTime() > new Date(tmpDate).getTime() ?
                                        <div
                                            className="application_message application_message__auth"
                                            key={i}
                                        >
                                            <div className="application_messageOwner">
                                                Вы
                                            </div>
                                            <div className="application_messageText">
                                                {message.text}
                                            </div>
                                            <div className="application_messageDate">
                                                {message.date.toLocaleTimeString(global.lang) + ' ' +
                                                    message.date.toLocaleDateString(global.lang)}
                                            </div>
                                        </div> : ''
                            })
                        }
                    </div>
                </div>

                <div className="application_events">
                    {
                        this.props.viewMode !== 'blocks' ?
                            <button
                                onClick={()=>this.changeEventsVisible.apply(this)}
                                className={(this.state.stringEventsMode ? "application_eventsStringButton__show " : "")+"application_eventsStringButton material-icons"}
                                title={this.state.stringEventsMode ? "Скрыть функции заявки." : "Показать функции заявки."}
                            >add</button>
                        : ''
                    }
                    {
                        userData.role !== 2 && this.props.state !== 'completed' && this.props.viewMode === 'blocks' ?
                        <button
                            className={"application_event" + (this.state.stringEventsMode ? "" : " application_event__stringModeHidden")}
                            title="Завершить заявку."
                            onClick={e=>this.endApplication.apply(this, [e])}
                        >
                            Завершить
                        </button> : ''
                    }
                    {
                        (userData.role === 0 || userData.role === 1) && this.props.state !== 'completed' && this.props.viewMode === 'blocks' ?
                        <button
                            title="Назначить исполнителя на заявку."
                            className={"application_event" + (this.state.stringEventsMode ? "" : " application_event__stringModeHidden")}
                            onClick={e=>this.setApplicationExecutor.apply(this, [e])}
                        >
                            {this.props.state === 'created' ? "Назначить" : "Переназначить"}
                        </button> : ''
                    }
                    {
                        this.props.state === 'created' ?
                        <button
                            title="Добавить в ''Мои заявки''"
                            className={"application_event" + (this.state.stringEventsMode ? "" : " application_event__stringModeHidden")}
                            onClick={e=>this.getApplication.apply(this, [e])}
                        >
                            Добавить в "Мои заявки"
                        </button> : ''
                    }
                    {
                        this.props.state === 'processing' || this.props.state === 'completed' || userData.role < 2 ?
                        <Link
                            className={"application_event" + (this.state.stringEventsMode ? "" : " application_event__stringModeHidden")}
                            title="Перейти на страницу заявки"
                            to={(this.props.state === 'completed' ? "/control-panel/archive/" : "/control-panel/applications/") + data.application_code}
                        >
                            Подробнее...
                        </Link> : ''
                    }
                </div>
                
                {
                    userData.role !== 2 && this.props.state === 'created' ?
                    <form
                        className="application_messageSender"
                        action=""
                        onSubmit={e=>this.sendMessage.apply(this, [e])}
                    >
                        <input
                            className="application_messageInput"
                            placeholder="Написать сообщение заявителю..."
                            title="Текстовое поле для ввода сообщения."
                            value={this.state.newMessage}
                            onChange={e=>this.changeNewMessage.apply(this, [e])}
                        />
                        <button
                            className="application_messageSendButton material-icons"
                            title="Отправить сообщение."
                        >send</button>
                    </form> : ''
                 }   
            </div>
        )
    }
}

export default connect(
    mapStateToProps('applicationCard'),
    mapDispatchToProps('applicationCard')
)(ApplicationCard)