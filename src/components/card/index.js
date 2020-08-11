import React from 'react'

import './index.scss'

export default class Card extends React.Component {
    render () {
        return (
            <div className="card" style={this.props.backgroundImage ? {backgroundImage: 'url('+this.props.backgroundImage+')'} : {}}>
                {this.props.children}
            </div>
        )
    }
}