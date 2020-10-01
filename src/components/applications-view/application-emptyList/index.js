import React from 'react'

import './index.scss'
import DoneImg from '../../../assets/ui/done.svg'

class ApplicationEmptyList extends React.Component {
    render () {
        return (
            <div className="applicationEmptyList">
                <img className="applicationEmptyList_img" src={DoneImg} />
                <p className="applicationEmptyList_text">Список заявок пуст!</p>
            </div>
        )
    }
}

export default ApplicationEmptyList