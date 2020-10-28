import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'
import './index.scss'

class Profile extends React.Component {
    constructor (props) {
        super (props)

        const userData = this.props.user.data

        this.state = {
            isEdit: false,
            userData: {
                full_name: userData.fullName,
                login: userData.login,
                mail: userData.mail,
                post: userData.post,
                user_type: userData.role,
                password: '••••••••',
                repeat_password: '••••••••'
            },
            newUserData: {
                full_name: userData.fullName,
                mail: userData.mail,
                post: userData.post,
                password: '',
                repeat_password: ''
            },
            ableToSave: false
        }
    }

    checkField () {
        let passwordCompleted = true
        if(this.state.newUserData.password !== "") {
            passwordCompleted = this.state.newUserData.repeat_password !== ""
        }
        this.setState({
            ableToSave: this.state.newUserData.full_name !== "" &&
                        this.state.newUserData.mail !== "" &&
                        this.state.newUserData.post !== "" &&
                        passwordCompleted &&
                        this.state.newUserData.password === this.state.newUserData.repeat_password
        })
    }

    changeEditingUserData (e) {
        const {newUserData} = this.state
        newUserData[e.target.name] = e.target.value
        this.setState({
            newUserData
        }, ()=>this.checkField())
    }

    changeMode (e) {
        e.preventDefault()
        if (this.state.isEdit) {
            const {newUserData, userData} = this.state
            let data = ""
            Object.keys(newUserData).forEach(key => {
                if(userData[key] !== undefined) {
                    if (newUserData[key] != userData[key]) {
                        if (newUserData[key] != '') {
                            data += "&" + key + "=" + newUserData[key]
                        }
                    }
                }
            })

            if (data !== "") {
                global.sendRequest ({
                    url: '/profile/',
                    method: 'PUT',
                    data: data.substring(1),
                    headers: {
                        token: this.props.user.token
                    }
                })
                .then(()=>{
                    userData.full_name = newUserData.full_name
                    userData.mail = newUserData.mail
                    userData.post = newUserData.post
                    this.setState({
                        userData,
                        isEdit: false
                    })
                })
                .catch(err=>{
                    this.cancelEdit()
                    this.props.createResultModal(err, 'error')
                })
            }
            else {
                this.setState({
                    isEdit: false
                })
            }
        }
        else {
            this.setState({
                isEdit: true
            }, ()=>this.checkField())
        }
    }

    cancelEditBtn (e) {
        e.preventDefault()
        this.setState({
            isEdit: false
        }, ()=>{
            this.cancelEdit()
        })
    }

    cancelEdit () {
        const {userData, newUserData} = this.state

        newUserData.full_name = userData.full_name
        newUserData.mail = userData.mail
        newUserData.password = ""
        newUserData.post = userData.post
        newUserData.repeat_password = ""

        this.setState ({
            newUserData
        })
    }

    render () {
        const {userData} = this.state
        const {newUserData} = this.state
        return (
            <form
                className="profile_wrapper"
                action=""
            >
                <div className="profile_info">
                    <div className="profile_avatarWrapper">
                        <div className="profile_avatar material-icons">
                            person
                        </div>
                        <button
                            className="profile_edit material-icons"
                            onClick={e=>this.changeMode.apply(this, [e])}
                            disabled={!this.state.ableToSave && this.state.isEdit}
                        >{this.state.isEdit ? "save" : "edit"}</button>
                        <button
                            className={"profile_cancelEdit"+(this.state.isEdit ? " profile_cancelEdit__shown" : "")}
                            onClick={e=>this.cancelEditBtn.apply(this, [e])}
                        >
                            <i className="profile_cancelIcon material-icons">close</i>
                            Отмена
                        </button>
                    </div>

                    <div className="profile_nameBlock">
                        <div className="profile_fullName">
                            {
                                this.state.isEdit ?
                                    <input
                                        className="profile_fullNameInput"
                                        type="text"
                                        name="full_name"
                                        placeholder="Фамилия Имя Отчество"
                                        value = {newUserData.full_name}
                                        onChange={e=>this.changeEditingUserData.apply(this, [e])}
                                    /> :
                                    userData.full_name
                            }
                        </div>
                        <p className="profile_login">
                            @{userData.login}
                        </p>
                    </div>
                </div>
                <div className="profile_fields">
                        <div className="profileField">
                            <div className="profileField_icon material-icons">
                                mail
                            </div>
                            {
                                this.state.isEdit ?
                                <input
                                    className="profileField_input"
                                    type="text"
                                    name="mail"
                                    title="Ваш адрес электронной почты."
                                    placeholder="Эл. почта"
                                    value = {newUserData.mail}
                                    onChange={e=>this.changeEditingUserData.apply(this, [e])}
                                /> :
                                <p className="profileField_text">
                                    <strong className="prfileField_title">Эл. почта:</strong> {userData.mail}
                                </p>
                            }
                        </div>
                        
                        <div className="profileField">
                            <div className="profileField_icon material-icons">
                                work
                            </div>
                            {
                                this.state.isEdit ?
                                <input
                                    className="profileField_input"
                                    type="text"
                                    name="post"
                                    title="Ваша должность."
                                    placeholder="Должность"
                                    value = {newUserData.post}
                                    onChange={e=>this.changeEditingUserData.apply(this, [e])}
                                /> :
                                <p className="profileField_text">
                                    <strong className="prfileField_title">Должность:</strong> {userData.post}
                                </p>
                            }
                        </div>
                        
                        <div className="profileField">
                            <div className="profileField_icon material-icons">
                                person
                            </div>
                            <p className="profileField_text">
                                <strong className="prfileField_title">Тип учётной записи:</strong> {userData.user_type === 0 ? "Администратор" : userData.user_type === 1 ? "Модератор" : "Пользователь"}
                            </p>
                        </div>
                        
                        <div className="profileField">
                            <div className="profileField_icon material-icons">
                                security
                            </div>
                            {
                                this.state.isEdit ?
                                <input
                                    className="profileField_input"
                                    type="password"
                                    name="password"
                                    title="Ваш пароль."
                                    placeholder="Пароль"
                                    value = {newUserData.password}
                                    onChange={e=>this.changeEditingUserData.apply(this, [e])}
                                /> :
                                <p className="profileField_text">
                                    <strong className="prfileField_title">Пароль:</strong> {userData.password}
                                </p>
                            }
                        </div>
                        
                        {
                            this.state.isEdit ?
                                <div className="profileField">
                                    <div className="profileField_icon material-icons">
                                        security
                                    </div>
                                    <input
                                        className="profileField_input"
                                        type="password"
                                        name="repeat_password"
                                        title="Повтор Вашего пароля."
                                        placeholder="Повтор пароля"
                                        value = {newUserData.repeat_password}
                                        onChange={e=>this.changeEditingUserData.apply(this, [e])}
                                    />
                                </div> : ''
                        }
                </div>
            </form>
        )
    }
}

export default connect(
    mapStateToProps('profile'),
    mapDispatchToProps('profile')   
)(Profile)