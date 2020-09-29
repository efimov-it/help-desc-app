import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import './index.scss'

class ApplicationCard extends React.Component {
    render () {
        const {data} = this.props
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

                <div className="application_message">
                    <div className="application_text">
                        {data.application_text}
                    </div>
                    <div className="application_date">
                        {new Date(data.date).toLocaleTimeString(global.lang) + ' ' +
                         new Date(data.date).toLocaleDateString(global.lang)}
                    </div>
                </div>

                <div className="application_events">
                    <button
                        className="application_event"
                    >
                        Завершить
                    </button>
                    <button
                        className="application_event"
                    >
                        Назначить
                    </button>
                    <button
                        className="application_event"
                    >
                        Добавить в "Мои заявки"
                    </button>
                    <button
                        className="application_event"
                    >
                        Подробнее
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps('applicationCard'),
    mapDispatchToProps('applicationCard')
)(ApplicationCard)