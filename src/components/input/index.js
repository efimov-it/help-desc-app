import React from 'react'
import './index.scss'

export default class Input extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            value: this.props.value ? this.props.value : ''
        }
    }

    onChange (e) {
        e.persist()
        this.setState({
            value: e.target.value
        }, ()=>{
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(e)
            }
        })
    }

    render () {
        return (
            <label
                className={"inputPlaceholder " + this.props.className}
                title={this.props.title}
            >
                {
                    this.props.type === 'select' ?
                        <select
                            className="input inputPlaceholder_value"
                            value={this.state.value}
                            onChange={e=>this.onChange.apply(this, [e])}
                            disabled={this.props.disabled}
                            name={this.props.name}
                        >
                            {
                                this.props.options.map(({value, text}) =>
                                    <option value={value}>{text}</option>
                                )
                            }
                        </select>
                    :
                        <input
                            className="input inputPlaceholder_value"
                            type={this.props.type ? this.props.type : 'text'}
                            value={this.state.value}
                            onChange={e=>this.onChange.apply(this, [e])}
                            disabled={this.props.disabled}
                            name={this.props.name}
                            required={this.props.required}
                        />
                }
                <p className="inputPlaceholder_placeholder">{this.props.placeholder}</p>
            </label>
        )    
    }
}