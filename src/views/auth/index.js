import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import Input from '../../components/input'
import LoadingIndicator from '../../components/loadingIndicator'

import './index.scss'

class Auth extends React.Component {

    state = {}

    constructor (props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            buttonDisabled: true
        }
    }

    onChange (e) {
        const state = {}
        state[e.target.name] = e.target.value
        this.setState(state, ()=>{
            this.setState({
                buttonDisabled: this.state.login === "" || this.state.password === ""
            })
        })
    }


    submit (e) {
        e.preventDefault()
        this.props.createModal({
            content: LoadingIndicator
        })
        global.sendRequest({
            method: 'POST',
            url: '/login/',
            data: 'login='+this.state.login+'&password='+this.state.password
        }).then(resp=>{
            this.props.closeModal()
            this.props.closeModal()
            localStorage.setItem('token', resp.token)
            localStorage.setItem('expiresIn', resp.expires_in)
            this.props.history.push('/control-panel/')
        })
        .catch(err=>{
            this.props.closeModal()
            this.props.createResultModal(err, 'error')
        });
    }

    render () {
        return (
            <form
                action=""
                className="auth-form"
            >
                <Input
                    type="text"
                    name="login"
                    placeholder="Логин"
                    value={this.state.login}
                    onChange={(e)=>this.onChange.apply(this, [e])}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={this.state.password}
                    onChange={(e)=>this.onChange.apply(this, [e])}
                    required
                />
                <button
                    type="submit"
                    className="button"
                    onClick={(e)=>this.submit.apply(this, [e])}
                    disabled={this.state.buttonDisabled}
                    title={this.state.buttonDisabled ? "Заполните все поля." : "Войти в панель управления."}
                >Войти</button>
            </form>
        )
    }
}

export default connect(
    mapStateToProps('auth'),
    mapDispatchToProps('auth')
)(withRouter(Auth))