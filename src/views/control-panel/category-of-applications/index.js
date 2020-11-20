import React from 'react'
import {connect} from 'react-redux'
import MapStateToProps from '../../../store/mapStateToProps'
import MapDispatchToProps from '../../../store/mapDispatchToProps'
import './index.scss'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'

import CategoryCard from './category-card'
import ConfirmDelete from './confirm-delete'

class CategoryOfApplications extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            categories: [],
            editingId: -1
        }

        this.categoryWrapper = React.createRef()
    }
    componentDidMount () {
        this.setState({
            categories: [
                {
                    id: 0,
                    name: 'Техническая поддержка',
                    description: 'Техническая поддержка',
                    count: 11,
                    position: 0,
                    children: [
                        {
                            id: 3,
                            name: 'Обслуживание',
                            description: 'Обслуживание',
                            count: 5,
                            position: 0,
                            children: [
                                {
                                    id: 8,
                                    name: 'ПК',
                                    description: '',
                                    count: 2,
                                    position: 0,
                                    children: []
                                },
                                {
                                    id: 9,
                                    name: 'ОРГ техника',
                                    description: '',
                                    count: 3,
                                    position: 1,
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 4,
                            name: 'Ремонт',
                            description: 'Ремонт',
                            count: 6,
                            position: 1,
                            children: [
                                {
                                    id: 10,
                                    name: 'ПК',
                                    description: '',
                                    count: 4,
                                    position: 0,
                                    children: []
                                },
                                {
                                    id: 11,
                                    name: 'ОРГ техника',
                                    description: '',
                                    count: 2,
                                    position: 1,
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 1,
                    name: '1С',
                    description: '1С',
                    count: 8,
                    position: 1,
                    children: [
                        {
                            id: 5,
                            name: 'Документооборот',
                            description: '',
                            count: 3,
                            position: 0,
                            children: []
                        },
                        {
                            id: 6,
                            name: 'Университет',
                            description: '',
                            count: 3,
                            position: 1,
                            children: []
                        },
                        {
                            id: 7,
                            name: 'Библиотека',
                            description: '',
                            count: 2,
                            position: 2,
                            children: []
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Сеть и интернет',
                    description: 'Сеть и интернет',
                    count: 5,
                    position: 2,
                    children: []
                }
            ]
        })
    }
    setEditingId(id) {
        this.setState({
            editingId: id
        })
    }

    getCategory (id, callback) {
        const {categories} = this.state
        let parent = []
        const recFind = (category, i) => {
            if (category.id === id) {
                callback(category, categories, parent[parent.length-1], i)
            }
            else {
                if (category.children) {
                    if (category.children.length > 0) {
                        parent.push(category)
                        category.children.map(recFind)
                    }
                }

                if (parent.length) {
                    if (parent[parent.length-1].children.length - 1 === i) {
                        parent.splice(parent.length-1, 1)
                    }
                }
            }
        }

        categories.find(recFind)
    }

    endEdit({name, description}, id) {
        //Запрос на обновление
        this.getCategory(id, (category, categories)=>{
            category.name = name
            category.description = description

            this.setState({
                categories,
                editingId: -1
            })
        })
    }
    delete (id) {
        this.getCategory(id, (category, categories, parent, i) => {
            this.props.createModal({
                header: 'Удаление категории',
                content: ConfirmDelete,
                data: {
                    name: category.name,
                    count: category.count,
                    onSubmit: () => {
                        //запрос на удаление
                        if (parent) {
                            parent.children.splice(i, 1)
                        }
                        else {
                            categories.splice(i, 1)
                        }
                        this.setState({
                            categories
                        }, ()=>{
                            this.props.closeModal()
                        })
                    }
                }
            })
        })
    }

    itemDrop (e) {
        let dragItem,
            positionItem,
            parentCategory = [],
            positionDepth = 0,
            positionParent = null,
            itemParent = null

        const position = e.position,    // before | after
              depth    = e.depth,       // глубина вложенности
              idItem   = e.idItem,      // id перетаскиваемого элемента
              idPlace  = e.idPlace,     // id элемента от которого строится
                                        // позиционирование
              {categories} = this.state

        const recFindPlace = (category, i) => {
            if (category.id === idItem && !dragItem) {
                if (parentCategory.length > 0) {
                    dragItem = parentCategory[parentCategory.length-1].children.splice(i, 1)[0]
                }
                else {
                    dragItem = categories.splice(i, 1)[0]
                }

                itemParent = parentCategory[parentCategory.length - 1]
            }

            if (idItem !== idPlace) {
                if (category.id === idPlace && !positionItem) {
                    if (parentCategory.length > 0) {
                        positionItem = parentCategory[parentCategory.length-1].children[i]
                    }
                    else {
                        positionItem = category[i]
                    }

                    if (parentCategory.length > 0) {
                        positionParent = parentCategory[parentCategory.length - 1]
                    }
                }
            }

            if (dragItem && positionItem) {
                return
            }

            if (category.children) {
                if (category.children.length > 0) {
                    if (!positionItem) {
                        positionDepth++
                    }
                    parentCategory.push(category)
                    category.children.map(recFindPlace)
                }
            }

            if (parentCategory.length > 0) {
                if (i === parentCategory[parentCategory.length-1].children.length - 1) {
                    parentCategory.splice(parentCategory.length - 1, 1)
                    if (!positionItem) {
                        positionDepth--
                    }
                }
            }
        }

        categories.map(recFindPlace)

        if (positionItem) {
            if (depth > positionDepth) {
                positionItem.children.splice(positionItem.children.length, 0, dragItem)
            }
            else {
                if (positionParent) {
                    positionParent.children.splice(positionParent.children.length, 0, dragItem)
                }
                else {
                    categories.splice(categories.length, 0, dragItem)
                }
            }
        }
        else {
            if (itemParent) {
                itemParent.children.splice(itemParent.children.length, 0, dragItem)
            }
            else {
                categories.splice(categories.length, 0, dragItem)
            }
        }

        this.setState({
            categories
        })
        
        // console.log(dragItem, positionItem, positionDepth);
    }

    render () {
        const recPageBuild = (category, i = 1) => {
            return (
                <div
                    className="categoryOfApplications_item"
                    key={category.id}
                >
                    <CategoryCard
                        category={category}
                        disabled={this.state.editingId !== -1 && category.id !== this.state.editingId}
                        isEdit={category.id === this.state.editingId}
                        wrapper={this.categoryWrapper.current}

                        onStartEdit={()=>this.setEditingId.apply(this, [category.id])}
                        onEndEdit={data=>this.endEdit.apply(this, [data, category.id])}
                        onDelete={()=>this.delete.apply(this, [category.id])}
                        onDrop={(e)=>this.itemDrop.apply(this, [e])}
                    />
                    <div
                        className="categoryOfApplications_itemChildren"
                        style={{
                            paddingLeft: i * 10 + 'px'
                        }}
                    >
                        {
                            category.children ?
                                category.children.map(category => recPageBuild(category, i + 1))
                            : ''
                        }
                    </div>
                </div>
            )
        }
        return (
            <div
                className="controlPanelBlock categoryOfApplications_wrapper"
                ref={this.categoryWrapper}
            >
                <div className="categoryOfApplications_header">
                    <button
                        className="categoryOfApplications_button material-icons"
                        title="Создать новую категорию"
                    >add</button>
                </div>

                <div
                    className="categoryOfApplications_content"
                >
                    {
                        this.state.categories.map(category => recPageBuild(category))
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps('categoryOfApplications'),
    mapDispatchToProps('categoryOfApplications')
)(CategoryOfApplications)