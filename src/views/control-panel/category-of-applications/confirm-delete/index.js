import React from 'react'
import {connect} from 'react-redux'
import MapStateToProps from '../../../../store/mapStateToProps'
import MapDispatchToProps from '../../../../store/mapDispatchToProps'
import mapStateToProps from '../../../../store/mapStateToProps'

import './index.scss'

class ConfirmDelete extends React.Component {
    onSubmit () {
        this.props.data.onSubmit()
    }
    render () {
        const {data} = this.props
        return (
            <>
                <p className="confirmDelete_text">
                    Вы действительно хотите удалить категорию "{data.name}"?
                </p>
                <p className="confirmDelete_text">
                    Количество активных заявок в категории: {data.count}
                </p>
                <p className="confirmDelete_text">
                    Удалив категорию, все заявки, активные и завершённые, остануться без категории или перейдут в родительскую категорию, если она есть. Их можно перенести в другую категорию. После удаления, сделать это будет невозможно.
                </p>
                <p className="confirmDelete_text">
                    Вы действительно хотите удалить эту категорию? 
                </p>

                <div className="modal_buttons">
                    <button
                        className="button modal_button"
                        onClick={this.props.closeModal}
                    >Отмена</button>
                    <button
                        className="button modal_button"
                        onClick={()=>this.onSubmit.apply(this)}
                    >Удалить</button>
                </div>
            </>
        )
    }
}

export default connect (
    MapStateToProps('confirmDelete'),
    MapDispatchToProps('confirmDelete')
)(ConfirmDelete)