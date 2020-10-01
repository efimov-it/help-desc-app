import React from 'react'
import './index.scss'

class ApplicationGet extends React.Component {
    render () {
        return (
            <>
                <p className="applicationGet_text">Вы действительно хотите добавить заявку #{this.props.data.applicationCode} в список "Мои заявки"?</p>
                <div className="modal_buttons">
                    <button
                        className="button"
                        title="Добавить в ''Мои заявки''"
                        onClick={this.props.data.onSubmit}
                    >Добавить</button>
                </div>
            </>
        )
    }
}

export default ApplicationGet