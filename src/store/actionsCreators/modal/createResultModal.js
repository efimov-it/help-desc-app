import React from 'react'

import CREATE_RESULT_MODAL from '../../actions/modals/create_result_modal'

export default (message, status) => {
    const modalHeader = status === 'error' ? 'Ошибка' : status === 'success' ? 'Выполнено' : 'Информация'
    const modalContent = () => {
        return (
            <div className="modal-result">
                <div className="modal-result_icon material-icons">
                    {
                        status === 'error' ? 'close' :
                            status === 'success' ? 'done' : 'warning'
                    }
                </div>
                <div className="modal-result_text">
                    {message}
                </div>
            </div>
        )
    }
    return {
        type: CREATE_RESULT_MODAL,
        modal: {
            header: modalHeader,
            content: modalContent
        }
    }
}