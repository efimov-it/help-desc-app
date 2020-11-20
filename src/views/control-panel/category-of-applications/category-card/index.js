import React from 'react'
import {connect} from 'react-redux'
import MapStateToProps from '../../../../store/mapStateToProps'
import MapDispatchToProps from '../../../../store/mapDispatchToProps'
import './index.scss'

import Input from '../../../../components/input'

class CategoryCard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            isEdit: false,
            name: props.category.name,
            description: props.category.description,
            move: false
        }
    }
    edit () {
        if(this.props.isEdit) {
            if (this.state.name) {
                const {name, description} = this.state
                this.props.onEndEdit({
                    name, description
                })
            }
            else {
                this.props.createResultModal('Вы не указали название категории', 'error')
            }
        }
        else {
            this.props.onStartEdit()
        }
    }
    onChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    startDrag(e) {
        e.persist()
        const block = e.target.parentElement,
              movementResult = {
                  depth: 0,
                  idItem: this.props.category.id,
                  idPlace: 0,
                  position: 'after'
              },
              children = block.nextSibling
        let lowerBlock = null,
            lastMovement = new Date().getTime()
        //Перемещение списка
        this.setState({
            move: true
        })
        document.body.style.cursor = "grabbing"
        children.style.display = 'none'

        window.addEventListener('mousemove', (e) => {
            const currentTime = new Date().getTime()

            if (currentTime - 30 > lastMovement) {
                lastMovement = currentTime
                if (this.state.move) {
                    const wrapperTop  = this.props.wrapper.parentElement.offsetTop
                    const wrapperLeft  = this.props.wrapper.parentElement.offsetLeft
                    
                    movementResult.depth = parseInt((e.x - wrapperLeft) / 30)

                    block.style.top = (e.y - wrapperTop - 60) + "px"
                    block.style.left = (movementResult.depth * 30) + "px"

                    let currentLowerBlock = null

                    e.path.forEach(block=>{
                        if (block.className === 'categoryCard' && block !== e.target) {
                            return currentLowerBlock = block
                        }
                    })
                    
                    if (currentLowerBlock) {
                        if (lowerBlock) {
                            if (lowerBlock !== currentLowerBlock) {
                                lowerBlock.style.marginTop = '0px'
                                lowerBlock.style.marginBottom = '0px'
                            }
                        }
                        lowerBlock = currentLowerBlock

                        movementResult.idPlace = parseInt(lowerBlock.getAttribute('idItem'))

                        const lowerBlockTop = lowerBlock.offsetTop + wrapperTop + 100
                        if (e.y < lowerBlockTop) {
                            lowerBlock.style.marginTop = '150px'
                            lowerBlock.style.marginBottom = '0px'
                            movementResult.position = 'before'
                        }
                        else {
                            lowerBlock.style.marginBottom = '150px'
                            lowerBlock.style.marginTop = '0px'
                            movementResult.position = 'after'
                        }
                    }
                }
            }
        })

        window.addEventListener('mouseup', (e) => {
            window.removeEventListener('mousemove,', window)
            window.removeEventListener('mouseup,', window)
            document.body.style.cursor = "unset"
            this.setState({
                move: false
            })
            if (lowerBlock) {
                lowerBlock.style.marginTop = '0px'
                lowerBlock.style.marginBottom = '0px'
            }
            else {
                movementResult.idPlace = movementResult.idItem
            }
            children.style.display = 'block'
            this.props.onDrop(movementResult)
        })
    }
    render () {
        const {category} = this.props
        return (
            <div
                className={(this.props.disabled ? "categoryCard__disabled " : "")+
                            (this.props.isEdit ? "categoryCard__edit " : "")+
                            (this.state.move ? "categoryCard__moving " : "")+
                            "categoryCard"}
                iditem={category.id}
            >
                <div
                    className="categoryCard_drag material-icons"
                    onMouseDown={e=>this.startDrag.apply(this, [e])}
                >drag_indicator</div>
                <div className={(this.props.disabled ? "categoryCard_text__disabled " : "")+"categoryCard_text"}>
                    {
                        !this.props.isEdit ?
                            <>
                                <p className="categoryCard_name">{category.name}</p>
                                <p className="categoryCard_description">{category.description}</p>
                            </>
                        :
                            <>
                                <Input
                                    placeholder="Название категории*"
                                    name="name"
                                    className="categoryCard_input"
                                    value={this.state.name}
                                    onChange={e=>this.onChange.apply(this, [e])}
                                    required
                                />
                                <Input
                                    placeholder="Краткое описание"
                                    name="description"
                                    className="categoryCard_input" 
                                    value={this.state.description}
                                    onChange={e=>this.onChange.apply(this, [e])}
                                />
                            </>
                    }
                    <p className="categoryCard_count">Количество заявок: {category.count}</p>
                </div>
                <div className="categoryCard_events">
                    <button
                        className="categoryCard_button material-icons"
                        title="Перенести заявки в другую категорию"
                        disabled={this.props.disabled || this.props.isEdit}
                    >
                        sync_alt
                    </button>
                    <button
                        className="categoryCard_button material-icons"
                        title={this.props.isEdit ? "Сохранить" : "Редактировать"}
                        onClick={e=>this.edit.apply(this, [e])}
                        disabled={this.props.disabled}
                    >
                        {this.props.isEdit ? "save" : "edit"}
                    </button>
                    <button
                        className="categoryCard_button material-icons"
                        title="Удалить"
                        onClick={this.props.onDelete}
                        disabled={this.props.disabled || this.props.isEdit}
                    >
                        delete
                    </button>
                    {/* <button
                        className="categoryCard_button material-icons"
                        title=""
                        onClick={()=>{}}
                        disabled={this.props.disabled}
                    >
                        sync_alt
                    </button> */}
                </div>
            </div>
        )
    }
}

export default connect(
    MapStateToProps('categoryCard'),
    MapDispatchToProps('categoryCard')
)(CategoryCard)