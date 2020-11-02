import React from 'react'
import './index.scss'

export default class Switcher extends React.Component {
    render () {
        return (
            <label className="switcher_wrapper">
                <input
                    type="checkbox"
                    className="switcher_input"
                    name={this.props.name}
                    onChange={e=>{
                        if (this.props.onChange) this.props.onChange(e)
                    }}
                />
                <div className="switcher">
                    <div className="switcher_state" />
                </div>
            </label>
        )
    }
}