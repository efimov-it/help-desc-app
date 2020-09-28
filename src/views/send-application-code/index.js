import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import Input from '../../components/input'
import LoadingIndicator from '../../components/loadingIndicator'

class SendApplicationCode extends React.Component {
    sendRequest (e) {
        e.preventDefault()
        e.persist()
        const mail = e.target[0].value
        if (mail === '') return this.props.createResultModal('Вы не указали адрес электронной почты.', 'error')
        this.props.createModal({
            content: LoadingIndicator
        })
        global.sendRequest({
            url: '/applications/send_code/?mail=' + mail
        })
        .then(()=>{
            this.props.closeModal()
            this.props.closeModal()
            this.props.createResultModal("Информация по Вашим заявкам была отправлена по указанному Вами адресу ("+mail+").", 'success')
        })
        .catch(err=>{
            this.props.closeModal()
            this.props.createResultModal(err, 'error')
        })
    }

    render() {
        return (
            <form
                action=""
                onSubmit={(e)=>this.sendRequest.apply(this, [e])}
            >
                <h2 className="modal-text_headText">
                    <i className="modal-text_headImg material-icons">alternate_email</i>Электронная почта
                </h2>
                <p className="modal-text_headSubtext">Для восстановления доступа к заявкам необходимо ввести адрес электронной почты, который Вы указывали при подаче заявки. Данные по вашим заявкам будут отправлены на указанный адрес электронной почты.</p>
                <Input
                    type="text"
                    name="mail"
                    required
                    placeholder="Электронная почта"
                />
                <div className="modal_buttons">
                    <button className="button modal_button">
                        Отправить
                    </button>
                </div>
            </form>
        )
    }
}


export default connect(
    mapStateToProps('applicationSendCode'),
    mapDispatchToProps('applicationSendCode')
)(SendApplicationCode)