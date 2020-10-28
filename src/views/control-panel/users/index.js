import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import LoadingIndicator from '../../../components/loadingIndicator'
import Input from '../../../components/input'
import Prompt from '../../../components/prompt'
import './index.scss'

class Users extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            users: [],
            selectedUser: -1,
            loading: true,
            isEdit: -1,
            currentUser: null,
            abbleToSave: false
        }
    }

    componentDidMount () {
        global.sendRequest({
            url: '/users/',
            headers: {
                token: this.props.user.token
            }
        })
        .then (resp => {
            this.setState({
                users: resp,
                loading: false
            })
        })
        .catch (err => {
            this.props.history.push('/control-panel/')
            this.props.createResultModal(err, 'error')
        })

        global.addEventListener('keydown', e=> {
            this.unselectUser(e)
        })
    }

    componentWillUnmount () {
        global.removeEventListener('keydown', this)
    }

    checkValidation () {
        const {currentUser} = this.state
        return currentUser.full_name !== '' &&
               currentUser.login !== '' &&
               currentUser.mail !== '' &&
               currentUser.user_post !== '' &&
               currentUser.user_type !== '' &&
               (
                   currentUser.password !== '••••••••' ?
                        currentUser.password !== '' &&
                        currentUser.password === currentUser.repeat_password
                   : true
               )
    }

    selectUser (i) {
        this.setState({
            selectedUser: i
        })
    }

    changeCurrentUser (e) {
        const {currentUser} = this.state
        currentUser[e.target.name] = e.target.value
        this.setState({
            currentUser,
            abbleToSave: this.checkValidation()
        })
    }

    editUser (e, i) {
        e.preventDefault()
        if (this.state.isEdit === -1) {
            this.setState({
                isEdit: i,
                currentUser: {
                    password: '••••••••',
                    repeat_password: '••••••••',
                    ...this.state.users[i]
                }
            }, ()=>{
                this.setState({
                    abbleToSave: this.checkValidation()
                })
            })
        }
        else {

            //Запрос на редактирование и проверка на существование (если был создан)

            const {currentUser, users} = this.state

            users[i].full_name = currentUser.full_name
            users[i].login = currentUser.login
            users[i].mail = currentUser.mail
            users[i].user_post = currentUser.user_post
            users[i].user_type = currentUser.user_type

            this.setState({
                isEdit: -1,
                users,
                currentUser: null
            })
        }
    }

    deleteOrCancel (e, i) {
        e.preventDefault()

        if (this.state.isEdit === -1) {
            const user = this.state.users[i]
            const user_type = user.user_type === 0 ? 'Администратор' : user.user_type === 1 ? 'Модератор' : 'Пользователь'
            const buttons = [
                {
                    text: "Да",
                    event: ()=>this.deleteQuery(i)
                },
                {
                    text: "Отмена",
                    event: ()=>{this.props.closeModal()}
                }
            ]
            this.props.createModal({
                header: 'Удаление',
                content: Prompt,
                data: {
                    text: 'Вы действительно хотите удалить пользователя '+user.full_name+' ('+user_type+') ?',
                    buttons
                }
            })
        }
        else {
            const buttons = [
                {
                    text: "Да",
                    event: ()=>{
                        this.setState ({
                            isEdit: -1
                        })
                        this.props.closeModal()
                    }
                },
                {
                    text: "Отмена",
                    event: ()=>{this.props.closeModal()}
                }
            ]
            this.props.createModal({
                header: 'Отмена',
                content: Prompt,
                data: {
                    text: 'Отменить внесённые изменения?',
                    buttons
                }
            })
        }
    }

    deleteQuery (i) {
        //запрос на удаление пользователя

        const {users} = this.state
        users.splice(i, 1)
        this.setState({
            selectedUser: -1,
            users
        })
        this.props.closeModal()
    }

    unselectUser (e) {
        if (this.state.isEdit === -1) {
            if (e.keyCode === 27) {
                this.setState({
                    selectedUser: -1
                })
            }
        }
    }

    render () {
        return (
            <div
                className="controlPanelBlock users_wrapper"
            >
                {
                    this.state.loading ?
                    <LoadingIndicator />
                    :
                    <>
                        <div className="users_side">
                            <div className="users_tools">
                                <button
                                    className="users_button material-icons"
                                    title="Создать нового пользователя"
                                    disabled={this.state.isEdit !== -1}
                                >
                                    add
                                </button>
                            </div>
                            {
                                this.state.users.length > 0 ?
                                    <ul className="users_list">
                                        {
                                            this.state.users.map((user, i) =>
                                                user ?
                                                    <li
                                                        className={"users_listItem" +
                                                                    (this.state.selectedUser !== -1 ? (i === this.state.selectedUser ? " users_listItem__select" : " users_listItem__notSelect") : "") +
                                                                    (this.state.isEdit !== i && this.state.isEdit !== -1 ? " users_listItem__notEdit" : "")}
                                                        key={i}
                                                        onClick={()=>this.selectUser.apply(this, [i])}
                                                        title={user.full_name}
                                                    >
                                                        <div className="users_listAvatar">
                                                            {user.full_name[0]}
                                                            {user.full_name[user.full_name.indexOf(" ")+1]}
                                                        </div>
                                                        <div className="users_listText">
                                                            <p className="users_listName">{user.full_name}</p>
                                                            <p className="users_listType">{user.user_type === 0 ? "Администратор" : user.user_type === 1 ? "Модератор" : "Пользователь"}</p>
                                                        </div>
                                                    </li>
                                                : ""
                                            )
                                        }
                                    </ul>
                                :
                                <p className="users_listEmpty">Нет зарегистрированных пользовтаелей.</p>
                            }
                        </div>
                        <div className="users_viewWrapper">
                            {
                                this.state.selectedUser !== -1 ?
                                    <form
                                        className="users_view"
                                        action=""
                                    >
                                        <div className="users_viewHeader">
                                            <p className="users_viewName">{this.state.users[this.state.selectedUser].full_name}</p>

                                            <button
                                                className="users_button material-icons"
                                                title={this.state.isEdit !== -1 ? "Сохранить" : "Редактировать"}
                                                onClick={e=>this.editUser.apply(this, [e, this.state.selectedUser])}
                                                disabled={this.state.isEdit !== -1 ? !this.state.abbleToSave : false}
                                            >
                                                {this.state.isEdit !== -1 ? "save" : "edit"}
                                            </button>

                                            <button
                                                className="users_button material-icons"
                                                title={this.state.isEdit !== -1 ? "Отменить" : "Удалить"}
                                                onClick={e=>this.deleteOrCancel.apply(this, [e, this.state.selectedUser])}
                                            >
                                                {this.state.isEdit !== -1 ? "close" : "delete"}
                                            </button>
                                        </div>

                                        <div className="users_viewContent">
                                            {
                                                this.state.isEdit === -1 ?
                                                    <div className="table_wrapper users_viewTable">
                                                        <table className="table">
                                                            <tr>
                                                                <td>
                                                                    Фамилия имя отчество:
                                                                </td>
                                                                <td>
                                                                    {this.state.users[this.state.selectedUser].full_name}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Логин:
                                                                </td>
                                                                <td>
                                                                    {this.state.users[this.state.selectedUser].login}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Эл. почта:
                                                                </td>
                                                                <td>
                                                                    {this.state.users[this.state.selectedUser].mail}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Должность:
                                                                </td>
                                                                <td>
                                                                    {this.state.users[this.state.selectedUser].user_post}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Тип:
                                                                </td>
                                                                <td>
                                                                    {this.state.users[this.state.selectedUser].user_type === 0 ? "Администратор" : this.state.users[this.state.selectedUser].user_type === 1 ? "Модератор" : "Пользователь"}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                :
                                                    <>
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Фамилия имя отчество"
                                                            name="full_name"
                                                            value={this.state.currentUser.full_name}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                        />
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Логин"
                                                            name="login"
                                                            value={this.state.currentUser.login}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                        />
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Эл. почта"
                                                            name="mail"
                                                            value={this.state.currentUser.mail}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                        />
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Должность"
                                                            name="user_post"
                                                            value={this.state.currentUser.user_post}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                        />
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Тип пользователя"
                                                            name="user_type"
                                                            type="select"
                                                            value={this.state.currentUser.user_type}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                            options={[
                                                                {
                                                                    value: 0,
                                                                    text: 'Администратор'
                                                                },
                                                                {
                                                                    value: 1,
                                                                    text: 'Модератор'
                                                                },
                                                                {
                                                                    value: 2,
                                                                    text: 'Пользователь'
                                                                }
                                                            ]}
                                                        />
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Пароль"
                                                            type="password"
                                                            name="password"
                                                            value={this.state.currentUser.password}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                        />
                                                        <Input
                                                            className="users_viewField"
                                                            placeholder="Повтор пароля"
                                                            type="password"
                                                            name="repeat_password"
                                                            value={this.state.currentUser.repeat_password}
                                                            onChange={e=>this.changeCurrentUser.apply(this, [e])}
                                                        />
                                                    </>
                                            }
                                        </div>
                                    </form>
                                :
                                <p className="users_viewEmpty">Выберите пользователя из списка слева.</p>
                            }
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps('users'),
    mapDispatchToProps('users')
)(withRouter(Users))