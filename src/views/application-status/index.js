import React from 'react'
import ScrollBar from 'react-scrollbars-custom'
import {connect} from 'react-redux'

import mapDispatchToProps from '../../store/mapDispatchToProps'
import mapStateToProps from '../../store/mapStateToProps'

import './index.scss'

import LoadingIndicator from '../../components/loadingIndicator'

class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            applicationText: null,
            completedDate: null,
            date: null,
            key: null,
            processingDate: null,
            resultText: null,
            status: null,
            supportFullname: null,
            supportPost: null,
            operatorFullname: null,
            operatorPost: null
        }
    }

    componentDidMount () {
        this.props.createModal({
            content: LoadingIndicator
        })
        global.sendRequest({
            url: "/applications/status/?key=" + this.props.data,
            method: "GET"
        })
        .then(resp => {
            this.setState({
                applicationText: resp.application_text,
                completedDate: resp.completed_date ? new Date(resp.completed_date).toLocaleDateString(global.lang) : '',
                date: resp.date ? new Date(resp.date).toLocaleDateString(global.lang) : '',
                key: resp.key,
                processingDate: resp.processing_date ? new Date(resp.processing_date).toLocaleDateString(global.lang) : '',
                resultText: resp.result_text,
                status: resp.status,
                supportFullname: resp.support_fullname,
                supportPost: resp.support_post,
                operatorFullname: resp.operator_fullname,
                operatorPost: resp.operator_post
            })
            this.props.closeModal()
        })
        .catch(err => {
            this.props.closeModal()
            this.props.closeModal()
            this.props.createResultModal(err, 'error')
        })
    }

    sendMessage (e) {
        e.preventDefault()
        e.persist()
        const textarea = e.target[0]

        this.props.createModal({
            content: LoadingIndicator
        })

        global.sendRequest({
            url: '/applications/message/',
            method: 'post',
            data: "key=" + this.state.key + "&message=" + textarea.value
        })
        .then(_=>{
            textarea.value = ''
            this.props.closeModal()
            this.props.createResultModal('Сообщение было успешно отправлено!', 'success')
        })
        .catch(err=>{
            this.props.closeModal()
            this.props.createResultModal(err, 'error')
        })
    }

    render () {
        return (
            <div className="application-status">
                <ScrollBar style={{
                                width: 'calc(100vw - 80px)',
                                maxWidth: '400px',
                                height: 'calc(100vh - 150px)',
                                maxHeight: '400px'
                           }}
                           noScrollX={true}>
                    <div className="application-status_indicator">
                        <div className="application-status_indicator-lamp material-icons"
                            title="Заявка зарегистрирована"
                            date={this.state.date}>assignment</div>

                        <div className={"application-status_indicator-path" + (this.state.status === 'created' ? ' application-status_indicator-path__off' : '')} />

                        <div className={"application-status_indicator-lamp material-icons" + (this.state.status === 'created' ? ' application-status_indicator-lamp__off' : '')}
                            title="Заявка обрабатывается"
                            date={this.state.processingDate}>build</div>

                        <div className={"application-status_indicator-path" + (this.state.status !== 'completed' ? ' application-status_indicator-path__off' : '')} />
                        
                        <div className={"application-status_indicator-lamp material-icons" + (this.state.status !== 'completed' ? ' application-status_indicator-lamp__off' : '')}
                            title="Заявка выполнена"
                            date={this.state.completedDate}>done</div>
                    </div>

                    <h2 className="application-status_header">
                        Ваша заявка {
                            this.state.status === 'created' ?
                                'зарегистрирована' :
                                    (this.state.status === 'processing' ?
                                        'обрабатывается' : 'выполнена')
                        }
                    </h2>

                    <div className="application-status_text">
                        <strong>Текст заявки: </strong> <p dangerouslySetInnerHTML={{__html:this.state.applicationText}} />
                    </div>
                    {
                        this.state.resultText ?
                        <div className="application-status_text">
                            <strong>Итог обращения: </strong> <p dangerouslySetInnerHTML={{__html:this.state.resultText}} />
                        </div> : ''
                    }
                    {
                        this.state.supportFullname ? 
                            <div className="application-status_executors">
                                <div className="application-status_executor">
                                    <div className="application-status_executor-img material-icons">
                                        person
                                    </div>

                                    <div className="application-status_executor-text">
                                        <p className="application-status_executor-name">
                                            {this.state.supportFullname}
                                        </p>
                                        <p className="application-status_executor-post"
                                        title="Исполнитель заявки">
                                            Исполнитель - {this.state.supportPost}
                                        </p>
                                    </div>
                                </div>
                                
                                { this.state.operatorFullname ? 
                                    <div className="application-status_executor">
                                        <div className="application-status_executor-img material-icons">
                                            person
                                        </div>

                                        <div className="application-status_executor-text">
                                            <p className="application-status_executor-name">
                                            {this.state.operatorFullname}
                                            </p>
                                            <p className="application-status_executor-post"
                                            title="Ответственный за проведение заявки">
                                                Оператор - {this.state.operatorPost}
                                            </p>
                                        </div>
                                    </div>
                                : '' }
                            </div>
                        : ''
                    }

                    {
                        this.state.status !== 'completed' ?
                        <form
                            className="application-status_message"
                            action=""
                            onSubmit={e=>this.sendMessage.apply(this, [e])}
                        >
                            <p className="application-status_message-text">
                                Вы можете написать сообщение, например если появились обновления по Вашей проблеме.
                            </p>
                            <textarea
                                className="application-status_message-textarea input input-area"
                                placeholder="Текст собщения"
                                name="message"
                                title="Сообщение отобразится у исполнителя и оператора заявки."
                            ></textarea>
                            <button 
                                type="submit"
                                className="button"
                            >
                                Отправить
                            </button>
                        </form> : ''
                    }
                </ScrollBar>
            </div>
        )
    }
}

export default connect(
    mapStateToProps('appicationStatus'),
    mapDispatchToProps('applicationStatus')
)(ApplicationStatus)