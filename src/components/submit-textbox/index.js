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
    onSubmit () {
        this.props.onSubmit(this.state.value)
        this.setState({
            value: ''
        })
    }

    render () {
        return (
            <div className={'submit-textbox' + (this.props.className ? ' ' + this.props.className : '')}>
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
                    onClick={()=>this.onSubmit.apply(this)}
                >
                    {this.props.buttonText}
                </button>
            </div>
        )
    }
}