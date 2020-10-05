import React from 'react'
import './index.scss'

class Messages extends React.Component {
    render () {
        return (
            <div className={"messages" + (this.props.className ? " " + this.props.className : "")}>
                {
                    this.props.messages.map(({fullName, userType, text, date}, i)=>
                        <div
                            className="messages_wrapper"
                            key={i}
                        >
                            {
                                i === this.props.messages.length - 1 ?
                                <div className="messages_date">
                                    {date.toLocaleDateString(global.lang)}
                                </div> : ''
                            }
                            {
                                i < this.props.messages.length - 1 ?
                                    date.getDate() != this.props.messages[i+1].date.getDate() ?
                                        <div className="messages_date">
                                            {date.toLocaleDateString(global.lang)}
                                        </div> : ''
                                : ''
                            }
                            <div className={"messages_item" + (fullName ? ' messages_item__auth' : '')}>
                                {
                                    fullName ?
                                    <div className="messages_owner">
                                        {fullName + " (" + userType + ")"}
                                    </div> : ''
                                }
                                <div className="messages_text">
                                    {text}
                                </div>
                                <div className="messages_time">
                                    {date.toLocaleTimeString(global.lang)}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Messages