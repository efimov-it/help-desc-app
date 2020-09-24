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
            isReady: false
        }
    }

    componentDidMount () {
            if (typeof this.props.data == 'string' && this.props.data.length > 0) {
                global.sendRequest({
                    url: "/applications/status/?key=" + this.props.data,
                    method: "GET"
                })
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        isReady: true
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else {
                this.props.closeModal()
                this.props.createResultModal('Вы не указали идентификатор вашей заявки.', 'error')
            }
    }

    render () {
        return (
            this.state.isReady ?
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
                            date="01.01.2020">assignment</div>

                        <div className={"application-status_indicator-path" + ('created' === 'created' ? ' application-status_indicator-path__off' : '')} />

                        <div className={"application-status_indicator-lamp material-icons" + ('created' === 'created' ? ' application-status_indicator-lamp__off' : '')}
                            title="Заявка обрабатывается"
                            date="01.02.2020">build</div>

                        <div className={"application-status_indicator-path" + ('created' !== 'completed' ? ' application-status_indicator-path__off' : '')} />
                        
                        <div className={"application-status_indicator-lamp material-icons" + ('created' !== 'completed' ? ' application-status_indicator-lamp__off' : '')}
                            title="Заявка выполнена"
                            date="01.03.2020">done</div>
                    </div>

                    <h2 className="application-status_header">
                        Ваша заявка {
                            'created' === 'created' ?
                                'зарегистрирована' :
                                    ('created' === 'processing' ?
                                        'обрабатывается' : 'выполнена')
                        }
                    </h2>

                    <div className="application-status_text">
                        <strong>Текст заявки:</strong> {"Текст"}
                    </div>

                    <div className="application-status_executors">
                        <div className="application-status_executor">
                            <div className="application-status_executor-img material-icons">
                                person
                            </div>

                            <div className="application-status_executor-text">
                                <p className="application-status_executor-name">
                                    {"Иванов Иван Иванович"}
                                </p>
                                <p className="application-status_executor-post"
                                title="Исполнитель заявки">
                                    Исполнитель - {"Техник"}
                                </p>
                            </div>
                        </div>
                        
                        { "Иванов Иван Иванович" ? 
                            <div className="application-status_executor">
                                <div className="application-status_executor-img material-icons">
                                    person
                                </div>

                                <div className="application-status_executor-text">
                                    <p className="application-status_executor-name">
                                    {"Иванов Иван Иванович"}
                                    </p>
                                    <p className="application-status_executor-post"
                                    title="Ответственный за проведение заявки">
                                        Оператор - {"Техник"}
                                    </p>
                                </div>
                            </div>
                        : '' }
                    </div>

                    <form className="application-status_message" action="">
                        <p className="application-status_message-text">Вы можете написать сообщение, например если появились обновления по Вашей проблеме.</p>
                        <textarea className="application-status_message-textarea input input-area"
                                placeholder="Текст собщения"
                                title="Сообщение отобразится у исполнителя и оператора заявки."></textarea>
                        <button type="submit"
                                className="button">Отправить</button>
                    </form>
                </ScrollBar>
            </div>
            :
            <LoadingIndicator />
        )
    }
}

export default connect(
    mapStateToProps('appicationStatus'),
    mapDispatchToProps('applicationStatus')
)(ApplicationStatus)