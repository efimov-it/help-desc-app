import React from 'react'
import Axios from 'axios'

import './index.scss'

export default class Auth extends React.Component {

    state = {}

    constructor (props) {
        super(props)

        this.state = {
            login: '',
            password: ''
        }

        this.onChangeLogin = this.onChangeLogin.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.submit = this.submit.bind(this)
    }

    onChangeLogin (e) {
        this.setState({
            login: e.target.value
        })
    }
    onChangePassword (e) {
        this.setState({
            password: e.target.value
        })
    }


    submit (e) {
        e.preventDefault()

        if (!this.state.login || !this.state.password) {
            this.props.modalError('Вы не указали логин или пароль.')
            return
        }

        Axios({
            method: 'POST',
            url: global.apiUrl + '/login/',
            data: 'login='+this.state.login+'&password='+this.state.password
        }).then((data)=>{
            const response = data.data
            if(response.status === "success") {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('expiresIn', response.data.expires_in)
                this.props.modalSubmit(this.props.modalId, {
                    func: 'auth'
                });
            }
            else {
                switch (response.message) {
                    case 'Invalid login or password':
                        this.props.modalError('Неверно указан логин или пароль.')
                    break;
                    case 'Data base error':
                        this.props.modalError('Ошибка базы данных. Пожалуйста, сообщите о проблеме системному администратору.')
                    break;
                    case 'login is empty':
                        this.props.modalError('Вы не указали логин.')
                    break;
                    case 'password is empty':
                        this.props.modalError('Вы не указали пароль.')
                    break;

                    default:
                        this.props.modalError('Произошла сетевая ошибка. Перезапустите страницу и попробуйте снова.')
                    break;
                }
            }
        })
        .catch((errr)=>{
            console.log(errr);
            this.props.modalError('Произошла сетевая ошибка. Перезапустите страницу и попробуйте снова.')
        });
    }

    render () {
        return (
            <form action="" className="auth-form">
                <label>
                    <p className="form-text">Логин:</p>
                    <input className="input"
                        type="text"
                        name="login"
                        value={this.state.login}
                        onChange={this.onChangeLogin}
                        required/>
                </label>
                <label>
                    <p className="form-text">Пароль:</p>
                    <input className="input"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        required/>
                </label>
                <button type="submit"
                        className="button"
                        onClick={this.submit}>Войти</button>
            </form>
        )
    }
}