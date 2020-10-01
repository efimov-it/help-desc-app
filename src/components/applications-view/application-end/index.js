import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import './index.scss'

import LoadingIndicator from '../../../components/loadingIndicator'

class ApplicationEnd extends React.Component {
    submit (e) {
        e.preventDefault()
        e.persist()
        const message = e.target[0].value
        if (message !== '') {
            this.props.createModal({
                content: LoadingIndicator
            })
            global.sendRequest({
                url: '/applications/end/',
                method: 'post',
                data: 'key=' + this.props.data.applicationCode + '&message='+message,
                headers: {
                    token: this.props.data.token
                }
            })
            .then(()=> {
                this.props.closeModal()
                this.props.closeModal()
                this.props.createResultModal('Заявка #' + this.props.data.applicationCode + ' успешно завершена.', 'success')
                
                if (typeof this.props.data.onSubmit === 'function') {
                    this.props.data.onSubmit()
                }
            })
            .catch(err=>{
                this.props.closeModal()
                this.props.createResultModal(err, 'error')
            })
        }
        else {
            this.props.createResultModal('Вы не указали текст сообщения.', 'error')
        }
    }
    render () {
        return (
            <form
                action=""
                onSubmit={e=>this.submit.apply(this, [e])}
            >
                <p
                    className="applicationEnd_text"
                >Для того чтобы завершить заявку, необходимо написать сообщение. Оно будет отправлено заявителю. Сообщение может содержать результат выполнения заявки, если она была выполнена без закрепления за исполнителем, либо причину преждевременного завершения заявки.</p>
                <textarea
                    className="input applicationEnd_input"
                    placeholder="Сообщение о завершении заявки..."
                />
                <div className="modal_buttons">
                    <button
                        className="button"
                    >
                        Завершить <i className="modal_buttonIcon material-icons">done</i>
                    </button>
                </div>
            </form>
        )
    }
}

export default connect(
    mapStateToProps('applicationEnd'),
    mapDispatchToProps('applicationEnd')
)(ApplicationEnd)