import React from 'react'
import {connect} from 'react-redux'

import './index.scss'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import mapStateToProps from '../../store/mapStateToProps'

import Input from '../../components/input'
import Switcher from '../../components/switcher'
import LoadingIndicator from '../../components/loadingIndicator'

class AddApplication extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            page: 0,
            data: {
                full_name: '',
                phone_number: '',
                phone_type: false,
                mail: '',
                office: '',
                unit: '',
                dept: '',
                application_text: ''
            },
            workerDataComplete: false,
            dataComplete: false,
            applicationKey: ''
        }
    }

    changePage (e, page) {
        e.preventDefault()
        this.setState({
            page
        })
    }

    changeValue (e) {
        console.log(e);
        const data = this.state.data
        data[e.target.name] = e.target.type === "checkbox" ? e.target.checked : e.target.value
        this.setState({
            data,
            workerDataComplete: this.state.data.full_name !== '' &&
                                this.state.data.phone_number !== '' &&
                                this.state.data.mail !== '' &&
                                this.state.data.office !== '' &&
                                this.state.data.unit !== '' &&
                                this.state.data.dept !== '',
            dataComplete: this.state.data.full_name !== '' &&
                          this.state.data.phone_number !== '' &&
                          this.state.data.mail !== '' &&
                          this.state.data.office !== '' &&
                          this.state.data.unit !== '' &&
                          this.state.data.dept !== '' &&
                          this.state.data.application_text !== ''
        })
    }

    sendData (e) {
        e.preventDefault()
        this.setState({
            page: 3
        })
        let data = ''
        Object.keys(this.state.data).forEach(key => {
            data += `&${key}=${this.state.data[key]}`
        })

        global.sendRequest({
            url: '/applications/',
            method: 'post',
            data: data.substring(1)
        })
        .then(resp=>{
            this.setState({
                applicationKey: resp.code
            })
        })
        .catch(err=>{
            this.props.closeModal()
            this.props.createResultModal(err)
        })

    }

    closeModal(e) {
        e.preventDefault()
        this.props.closeModal()
    }

    render () {
        return (
            <form
                className="addApplication"
                action=""
            >
                <div
                    className="addApplication_slider"
                    style={{
                        transform: `translateX(${this.state.page * -25}%)`
                    }}
                >
                    {/* 1th page */}
                    <div
                        className="addApplication_slide"
                        style={
                            this.state.page !== 0 ? {
                                transform: 'scale(0)',
                                opacity: '0',
                                maxHeight: '0px'
                            } : {}
                        }
                    >
                        <h2 className="modal-text_headText">
                            <i className="modal-text_headImg material-icons">assignment</i>Шаг 1 из 3
                        </h2>
                        <p  className="modal-text_headSubtext">Данные сотрудника</p>
                        <Input
                            placeholder="Фамилия Имя Отчество"
                            title="Поле для ввода фамилии, имени, отчества."
                            name="full_name"
                            onChange={e=>this.changeValue.apply(this, [e])}
                            className="addApplication_input"
                        />
                        <Input
                            placeholder="Телефон"
                            title="Поле для ввода телефонного номера"
                            name="phone_number"
                            onChange={e=>this.changeValue(e)}
                            className="addApplication_input"
                        />
                        <div className="addApplication_phoneType phoneType">
                            <p className="phoneType_placeholder">Тип телефона:</p>
                            <div className="phoneType_switcher">
                                <span className="phoneType_switcher-text">Внутренний</span>
                                <Switcher
                                    name="phone_type"
                                    onChange={e=>this.changeValue(e)}
                                />
                                <span className="phoneType_switcher-text">Внешний</span>
                            </div>
                        </div>
                        <Input
                            placeholder="Адрес электронной почты"
                            title="Поле для ввода адреса электронной почты"
                            name="mail"
                            onChange={e=>this.changeValue(e)}
                            className="addApplication_input"
                        />
                        <Input
                            placeholder="Кабинет"
                            title="Поле для ввода номера кабинета"
                            name="office"
                            onChange={e=>this.changeValue(e)}
                            className="addApplication_input"
                        />
                        <Input
                            placeholder="Подразделение"
                            title="Поле для ввода названия подразделения"
                            name="unit"
                            onChange={e=>this.changeValue(e)}
                            className="addApplication_input"
                        />
                        <Input
                            placeholder="Отдел"
                            title="Поле для ввода названия отдела"
                            name="dept"
                            onChange={e=>this.changeValue(e)}
                            className="addApplication_input"
                        />
                        <div className="modal_buttons">
                            <button
                                title={this.state.workerDataComplete ? "Перейти к следующему шагу" : "Заполните все поля"}
                                className="button modal_button"
                                onClick={(e)=>this.changePage.apply(this, [e, 1])}
                                disabled={!this.state.workerDataComplete}
                            >
                                Далее <i className="modal_buttonIcon material-icons">arrow_forward</i>
                            </button>
                        </div>
                    </div>

                    {/* 2th page */}
                    <div
                        className="addApplication_slide"
                        style={
                            this.state.page !== 1 ? {
                                transform: 'scale(0)',
                                opacity: '0',
                                maxHeight: '0px'
                            } : {}
                        }
                    >
                        <h2 className="modal-text_headText">
                            <i className="modal-text_headImg material-icons">assignment</i>Шаг 2 из 3
                        </h2>
                        <p  className="modal-text_headSubtext">Текст заявки</p>

                        <textarea
                            className="addApplication_textarea input"
                            name="application_text"
                            placeholder="Опишите вашу проблему..."
                            onChange={e=>this.changeValue.apply(this, [e])}
                        />
                        
                        <div className="modal_buttons">
                            <button
                                className="button modal_button"
                                onClick={(e)=>this.changePage.apply(this, [e, 0])}
                                title="Вернуться к предыдущему шагу"
                            >
                                Назад
                            </button>

                            <button
                                className="button modal_button"
                                onClick={(e)=>this.changePage.apply(this, [e, 2])}
                                disabled={!this.state.dataComplete}
                                title={this.state.dataComplete ? "Перейти к следующему шагу" : "Заполните все поля"}
                            >
                                Далее <i className="modal_buttonIcon material-icons">arrow_forward</i>
                            </button>
                        </div>
                    </div>

                    {/* 3th page */}
                    <div
                        className="addApplication_slide"
                        style={
                            this.state.page !== 2 ? {
                                transform: 'scale(0)',
                                opacity: '0',
                                maxHeight: '0px'
                            } : {}
                        }
                    >
                        <h2 className="modal-text_headText">
                            <i className="modal-text_headImg material-icons">assignment</i>Почти всё!
                        </h2>
                        <p  className="modal-text_headSubtext">Осталось только проверить правильность введённых данных</p>

                        <div className="addApplication_table table_wrapper">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Ф.И.О. заявителя:</td>
                                        <td>{this.state.data.full_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Телефон:</td>
                                        <td>{this.state.data.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Тип телефона:</td>
                                        <td>{this.state.data.phone_type === false ? 'Внутренний' : 'Внешний'}</td>
                                    </tr>
                                    <tr>
                                        <td>Электронная почта:</td>
                                        <td>{this.state.data.mail}</td>
                                    </tr>
                                    <tr>
                                        <td>Кабинет:</td>
                                        <td>{this.state.data.office}</td>
                                    </tr>
                                    <tr>
                                        <td>Подразделение:</td>
                                        <td>{this.state.data.unit}</td>
                                    </tr>
                                    <tr>
                                        <td>Отдел:</td>
                                        <td>{this.state.data.dept}</td>
                                    </tr>
                                    <tr>
                                        <td>Текст заявки:</td>
                                        <td>{this.state.data.application_text}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="modal_buttons">
                            <button
                                className="button modal_button"
                                onClick={(e)=>this.changePage.apply(this, [e, 1])}
                                title="Вернуться к предыдущему шагу"
                            >
                                Назад
                            </button>

                            <button
                                className="button modal_button"
                                onClick={(e)=>this.sendData.apply(this, [e])}
                                disabled={!this.state.dataComplete}
                                title="Отправить заявку"
                            >
                                Отправить <i className="modal_buttonIcon material-icons">done</i>
                            </button>
                        </div>
                    </div>

                    {/* 4th page */}
                    <div
                        className="addApplication_slide"
                        style={
                            this.state.page !== 3 ? {
                                transform: 'scale(0)',
                                opacity: '0',
                                maxHeight: '0px'
                            } : {}
                        }
                    >
                        {
                            this.state.applicationKey === '' ?
                            <LoadingIndicator /> :
                            (
                                <>
                                    <h2 className="modal-text_headText">
                                        <i className="modal-text_headImg material-icons">assignment</i>Готово!
                                    </h2>
                                    <p  className="modal-text_headSubtext">Ваша заявка успешно зарегистрирована!</p>

                                    <p>Это идентификатор вашей заявки:</p>
                                    <p className="addApplication_key">{this.state.applicationKey}</p>
                                    <p>Советуем сохранить его или записать, чтобы не потерять.</p>
                                    
                                    <div className="modal_buttons">
                                        <button
                                            className="button modal_button"
                                            title="Закрыть окно"
                                            onClick={e=>this.closeModal.apply(this, [e])}
                                        >
                                            Закрыть
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(
    mapStateToProps('addApplication'),
    mapDispatchToProps('addApplication')
)(AddApplication)