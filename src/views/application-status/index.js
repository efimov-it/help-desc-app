import React from 'react'
import ScrollBar from 'react-scrollbars-custom'

import './index.scss'

export default class ApplicationStatus extends React.Component {
    constructor (props) {
        super(props)

        const modalData = props.modalData

        this.state = {
            date: modalData.date ? new Date(modalData.date).toLocaleDateString('RU-ru') : '',
            dateProcessing: modalData.processing_date ? new Date(modalData.processing_date).toLocaleDateString('RU-ru') : '',
            dateComplete: modalData.completed_date ? new Date(modalData.completed_date).toLocaleDateString('RU-ru') : '',
        }
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

                        <div className={"application-status_indicator-path" + (this.props.modalData.status === 'created' ? ' application-status_indicator-path__off' : '')} />

                        <div className={"application-status_indicator-lamp material-icons" + (this.props.modalData.status === 'created' ? ' application-status_indicator-lamp__off' : '')}
                            title="Заявка обрабатывается"
                            date={this.state.dateProcessing}>build</div>

                        <div className={"application-status_indicator-path" + (this.props.modalData.status !== 'completed' ? ' application-status_indicator-path__off' : '')} />
                        
                        <div className={"application-status_indicator-lamp material-icons" + (this.props.modalData.status !== 'completed' ? ' application-status_indicator-lamp__off' : '')}
                            title="Заявка выполнена"
                            date={this.state.dateComplete}>done</div>
                    </div>

                    <h2 className="application-status_header">
                        Ваша заявка {
                            this.props.modalData.status === 'created' ?
                                'зарегистрирована' :
                                    (this.props.modalData.status === 'processing' ?
                                        'обрабатывается' : 'выполнена')
                        }
                    </h2>

                    <div className="application-status_text">
                        <strong>Текст заявки:</strong> {this.props.modalData.application_text}
                    </div>

                    <div className="application-status_executors">
                        <div className="application-status_executor">
                            <div className="application-status_executor-img material-icons">
                                person
                            </div>

                            <div className="application-status_executor-text">
                                <p className="application-status_executor-name">
                                    {this.props.modalData.support_fullname}
                                </p>
                                <p className="application-status_executor-post"
                                title="Исполнитель заявки">
                                    Исполнитель - {this.props.modalData.support_post}
                                </p>
                            </div>
                        </div>
                        
                        { this.props.modalData.operator_fullname ? 
                            <div className="application-status_executor">
                                <div className="application-status_executor-img material-icons">
                                    person
                                </div>

                                <div className="application-status_executor-text">
                                    <p className="application-status_executor-name">
                                    {this.props.modalData.operator_fullname}
                                    </p>
                                    <p className="application-status_executor-post"
                                    title="Ответственный за проведение заявки">
                                        Оператор - {this.props.modalData.operator_post}
                                    </p>
                                </div>
                            </div>
                        : '' }
                    </div>

                    {/* <form className="application-status_message" action="">
                        <p className="application-status_message-text">Вы можете написать сообщение, например если появились обновления по Вашей проблеме.</p>
                        <textarea className="application-status_message-textarea input input-area"
                                placeholder="Текст собщения"
                                title="Сообщение отобразится у исполнителя и оператора заявки."></textarea>
                        <button type="submit"
                                className="button">Отправить</button>
                    </form> */}
                </ScrollBar>
            </div>
        )
    }
}