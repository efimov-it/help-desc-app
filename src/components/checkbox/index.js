import React from 'react'
import './index.scss'

export default class Checkbox extends React.Component {
    render () {
        return (
            <label className={"checkbox " + this.props.className}>
                <input
                    type="checkbox"
                    className="checkbox_input"
                    name={this.props.name}
                    onChange={e=>this.props.onChange(e)}
                />
                <i className="checkbox_check material-icons">
                    done
                </i>
            </label>
        )
    }
}