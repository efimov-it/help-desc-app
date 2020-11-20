import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../../../store/mapStateToProps'
import mapDispatchToProps from '../../../../store/mapDispatchToProps'
import {withRouter} from 'react-router-dom'
import Messages from '../../../../components/messages'
import './index.scss'

import ApplicationEnd from '../../../../components/applications-view/application-end'
import ApplicationSetExecutor from '../../../../components/applications-view/application-setExecutor'
import ApplicationGet from '../../../../components/applications-view/application-get'

import LoadingIndicator from '../../../../components/loadingIndicator'

class ApplicationPage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            application: null,
            showEvents: true,
            infoBlockState: false
        }
    }

    componentDidMount () {
        this.loadData()
    }

    loadData () {
        global.sendRequest ({
            url: '/applications/?key='+this.props.match.params.key,
            headers: {
                token: this.props.user.token
            }
        })
        .then(resp => {
            const application = {
                fullName: resp.full_name,
                phone: resp.phone,
                phoneType: resp.phone_type,
                mail: resp.mail,
                dept: resp.dept,
                unit: resp.unit,
                office: resp.office,
                text: resp.application_text,
                date: new Date(resp.date),
                exectutorFullName: resp.executor_full_name,
                operatorFullName: resp.operator_full_name,
                messages: [],
                completed: resp.completed ? {
                               date: new Date(resp.completed.date).toLocaleDateString(global.lang),
                               resultText: resp.completed.result_text
                           } : null
            }

            if (resp.messages) {
                resp.messages.forEach(message => 
                    application.messages.push({
                            text: message.text,
                            date: new Date(message.date),
                            fullName: message.full_name,
                            userType: message.user_type === 0 ? "Администратор" : message.user_type === 1 ? "Модератор" : "Сотрудник"
                    })    
                )
            }
            this.setState({
                application
            })
        })
        .catch(err => {
            this.props.createResultModal(err, 'error')
            this.props.history.push('/control-panel/applications/')
        })
    }

    changeInfoBlockState () {
        this.setState({
            infoBlockState: !this.state.infoBlockState
        })
    }

    changeEventsShow (e) {
        e.preventDefault()
        this.setState({
            showEvents: !this.state.showEvents
        })
    }

    endApplication () {
        const applicationCode = this.props.match.params.key
        this.props.createModal({
            header: 'Завершение заявки #' + applicationCode,
            content: ApplicationEnd,
            data: {
                applicationCode,
                token: this.props.user.token,
                onSubmit: () => {
                    this.loadData()
                }
            }
        })
    }
    
    setApplicationExecutor () {
        const applicationCode = this.props.match.params.key
        this.props.createModal({
            header: 'Назначить исполнителя для #' + applicationCode,
            content: ApplicationSetExecutor,
            data: {
                applicationCode,
                token: this.props.user.token,
                onSubmit: () => {
                    this.loadData()
                }
            }
        })
    }

    getApplication () {
        const applicationCode = this.props.match.params.key
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
                this.loadData()
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

    sendMessage (e) {
        e.preventDefault()
        e.persist()
        if (e.target[1].value != "") {
            global.sendRequest({
                url: '/applications/message/',
                method: 'post',
                data: 'key='+this.props.match.params.key+"&message="+e.target[1].value,
                headers: {
                    token: this.props.user.token
                }
            })
            .then(()=>{
                const {application} = this.state
                application.messages.splice(0, 0, {
                    text: e.target[1].value,
                    date: new Date(),
                    fullName: this.props.user.data.fullName,
                    userType: this.props.user.data.role === 0 ? "Администратор" : this.props.user.data.role === 1 ? "Модератор" : "Пользователь"
                })
                e.target[1].value = ""
                this.setState(application)
            })
            .catch(err=>{
                this.props.createResultModal(err, 'error')
            })
        }
    }

    render () {
        return (
            <div className="controlPanelBlock applicationPage_wrapper">
                {
                    this.state.application ?
                    <>
                        <header
                            className={"applicationPage_header" + (this.state.infoBlockState ? "" : " applicationPage_header__mobHide")}
                        >
                            <h2 className="applicationPage_code">#{this.props.match.params.key}</h2>
                            
                            <div className="applicationPage_table table_wrapper">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Заявитель:</td>
                                            <td>{this.state.application.fullName}</td>
                                        </tr>
                                        <tr>
                                            <td>Дата подачи:</td>
                                            <td>{this.state.application.date.toLocaleDateString(global.lang)}</td>
                                        </tr>
                                        <tr>
                                            <td>Телефон:</td>
                                            <td>
                                                <a
                                                    className="link"
                                                    href={'tel:' + this.state.application.phone}
                                                >
                                                    {this.state.application.phone}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Тип телефона:</td>
                                            <td>{this.state.application.phoneType === 0 ? 'Внутренний' : 'Внешний'}</td>
                                        </tr>
                                        <tr>
                                            <td>Эл. почта:</td>
                                            <td>
                                                <a
                                                    className="link"
                                                    href={'mailto:'+this.state.application.mail}
                                                >
                                                    {this.state.application.mail}
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Отдел:</td>
                                            <td>{this.state.application.dept}</td>
                                        </tr>
                                        <tr>
                                            <td>Подразделение:</td>
                                            <td>{this.state.application.unit}</td>
                                        </tr>
                                        <tr>
                                            <td>Кабинет:</td>
                                            <td>{this.state.application.office}</td>
                                        </tr>
                                        <tr>
                                            <td>Исполнитель:</td>
                                            <td>{this.state.application.exectutorFullName ? this.state.application.exectutorFullName : 'Не назначен'}</td>
                                        </tr>
                                        {
                                            this.state.application.operatorFullName ?
                                            <tr>
                                                <td>Оператор:</td>
                                                <td>{this.state.application.operatorFullName}</td>
                                            </tr> : ''
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <p className="applicationPage_textHeader">
                                Текст заявки:
                            </p>
                            <p className="applicationPage_text">
                                {this.state.application.text}
                            </p>

                            <div className="applicationPage_contacts">
                                <a
                                    href={"tel:"+this.state.application.phone}
                                    text="Позвонить"
                                    className="applicationPage_contactsButton material-icons applicationPage_contactsButton__mobHide"
                                >call</a>

                                <a
                                    href={"mailto:"+this.state.application.mail}
                                    text="Письмо"
                                    className="applicationPage_contactsButton material-icons"
                                >mail</a>

                                <a
                                    href={"sms:"+this.state.application.phone}
                                    text="SMS"
                                    className="applicationPage_contactsButton material-icons"
                                >sms</a>
                            </div>
                        
                            
                            {
                                this.state.application.completed ?
                                    <form
                                        action=""
                                        className="applicationPage_returnForm"
                                    >
                                        <p className="applicationPage_returnFormText">Вы можете восстановить завершённую заявку:</p>
                                        <textarea
                                            className="input applicationPage_returnFormInput"
                                            placeholder="Причина восстановления заявки"
                                        />
                                        <button
                                            className="button"
                                            type="submit"
                                        >Восстановить</button>
                                    </form>
                                : ''
                            }
                        </header>

                        <div className="applicationPage_content">
                            <div className="applicationPage_mobHeader">
                                <div className="applicationPage_mobAvatar material-icons">
                                    person
                                </div>
                                <div className="applicationPage_mobFullName">
                                    {this.state.application.fullName}
                                </div>
                                <div className="applicationPage_mobButtons">
                                    <a
                                        className="applicationPage_mobButton material-icons"
                                        href={"tel:"+this.state.application.phone}
                                    >
                                        call
                                    </a>
                                    <button
                                        className="applicationPage_mobButton material-icons"
                                        onClick={()=>this.changeInfoBlockState.apply(this)}
                                    >
                                        {this.state.infoBlockState ? 'close' : 'more_vert'}
                                    </button>
                                </div>
                            </div>
                            <Messages
                                className="applicationPage_messages"
                                messages={this.state.application.messages}
                            />

                            <div className="applicationPage_newMessage">
                                {
                                    !this.state.application.completed ?
                                        <>
                                            {
                                                this.state.showEvents ?
                                                <div className="applicationPage_events">
                                                    <button
                                                        className="applicationPage_event"
                                                        onClick={()=>this.endApplication.apply(this)}
                                                    >
                                                        Завершить
                                                    </button>
                                                    {
                                                        this.props.user.data.role < 2?
                                                        <button
                                                            className="applicationPage_event"
                                                            onClick={()=>this.setApplicationExecutor.apply(this)}
                                                        >
                                                            {this.state.application.exectutorFullName ? "Переназначить" : "Назначить"}
                                                        </button> : ''
                                                    }
                                                    {
                                                        !this.state.application.exectutorFullName ? 
                                                        <button
                                                            className="applicationPage_event"
                                                            onClick={()=>this.getApplication.apply(this)}
                                                        >
                                                            Добавить в "Мои заявки"
                                                        </button> : ''
                                                    }
                                                </div> : ''
                                            }

                                            <form
                                                className="applicationPage_messageInput"
                                                action=""
                                                onSubmit={e=>this.sendMessage.apply(this, [e])}
                                            >
                                                <button
                                                    className={"applicationPage_eventsButton material-icons" + (this.state.showEvents ? " applicationPage_eventsButton__active" : "")}
                                                    title="Функции заявки."
                                                    onClick={(e)=>this.changeEventsShow.apply(this, [e])}
                                                    type="button"
                                                >
                                                    apps
                                                </button>

                                                <input
                                                    className="applicationPage_messageTextBox"
                                                    placeholder="Написать сообщение заявителю..."
                                                    title="Текстовое поле для ввода сообщения."
                                                />

                                                <button
                                                    className="applicationPage_sendButton material-icons"
                                                    title="Отправить сообщение."
                                                    type="submit"
                                                >send</button>
                                            </form>
                                        </>
                                        : (
                                            <div className="applicationPage_completedBlock">
                                                <p className="applicationPage_completedTitle">Результат выполнения заявки:</p>
                                                <p className="applicationPage_completedText" dangerouslySetInnerHTML={{__html: this.state.application.completed.resultText}} />
                                                <p className="applicationPage_completedDate">{this.state.application.completed.date}</p>
                                            </div>
                                        )

                                }
                            </div>
                        </div>
                    </>
                    : <LoadingIndicator />
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps('applicationPage'),
    mapDispatchToProps('applicationPage')
)(withRouter(ApplicationPage))