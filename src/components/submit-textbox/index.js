import React from 'react'

import './index.scss'

export default class SubmitTextBox extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    updateValue (e) {
        this.setState({
            value: e.target.value
        });
    }
    onSubmit (e) {
        e.preventDefault()
        this.props.onSubmit(this.state.value)
        this.setState({
            value: ''
        })
    }

    render () {
        return (
            <form
                className={'submit-textbox' + (this.props.className ? ' ' + this.props.className : '')}
                action=""
            >
                <input
                    className="submit-textbox_input"
                    type="text"
                    placeholder={this.props.placeholder}
                    title={this.props.inputTitle}
                    value={this.state.value}
                    onChange={(e)=>this.updateValue.apply(this, [e])}
                />
                <button 
                    className="submit-textbox_button"
                    title={this.props.buttonTitle}
                    onClick={(e)=>this.onSubmit.apply(this, [e])}
                >
                    {this.props.buttonText}
                </button>
            </form>
        )
    }
}