import React from 'react'

import './index.scss'

export default class SubmitTextBox extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            onSubmit: props.onSubmit,
        }
        this.updateValue = this.updateValue.bind(this);
    }

    updateValue (e) {
        this.setState({
            value: e.target.value
        });
    }

    render () {
        return (
            <div className={'submit-textbox' + (this.props.className ? ' ' + this.props.className : '')}>
                <input className="submit-textbox_input"
                       type="text"
                       placeholder={this.props.placeholder}
                       title={this.props.inputTitle}
                       onChange={this.updateValue} />
                <button className="submit-textbox_button"
                        title={this.props.buttonTitle}
                        onClick={()=>{this.state.onSubmit(this.state.value)}}>
                            {this.props.buttonText}
                </button>
            </div>
        )
    }
}