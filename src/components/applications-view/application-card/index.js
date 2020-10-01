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

    render () {
        const {data, user} = this.props
        const userData = user.data
        return (
            <div className={"application " + this.props.className}>
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
                        <div className="application_message application_message__auth">
                            <div className="application_messageOwner">
                                {"Иванов Иван Иванович (Модератор)"}
                            </div>
                            <div className="application_messageText">
                                {"Последний ответ от тех. поддержки"}
                            </div>
                            <div className="application_messageDate">
                                {new Date(data.date).toLocaleTimeString(global.lang) + ' ' +
                                new Date(data.date).toLocaleDateString(global.lang)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="application_events">
                    {
                        userData.role === 0 ?
                        <button
                            className="application_event"
                            title="Завершить заявку."
                            onClick={e=>this.endApplication.apply(this, [e])}
                        >
                            Завершить
                        </button> : ''
                    }
                    {
                        userData.role === 0 || userData.role === 1 ?
                        <button
                            title="Назначить исполнителя на заявку."
                            className="application_event"
                            onClick={e=>this.setApplicationExecutor.apply(this, [e])}
                        >
                            Назначить
                        </button> : ''
                    }
                    {
                        this.props.state === 'created' ?
                        <button
                            title="Добавить в ''Мои заявки''"
                            className="application_event"
                            onClick={e=>this.getApplication.apply(this, [e])}
                        >
                            Добавить в "Мои заявки"
                        </button> : ''
                    }
                    {
                        this.props.state === 'processing' || this.props.state === 'completed' ?
                        <Link
                            className="application_event"
                            title="Перейти на страницу заявки"
                            to={"/control-panel/applications/" + data.application_code}
                        >
                            Подробнее...
                        </Link> : ''
                    }
                </div>
                
                {
                    userData.role !== 2 || this.props.state === 'processing' ?
                    <form
                        className="application_messageSender"
                        action=""
                    >
                        <input
                            className="application_messageInput"
                            placeholder="Написать сообщение заявителю..."
                            title="Текстовое поле для ввода сообщения."
                            value=""
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