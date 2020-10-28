import React from 'react'
import './index.scss'

export default class Prompt extends React.Component {
    render () {
        return (
            <>
                <p className="prompt_text">
                    {this.props.data.text}
                </p>
                <div className="modal_buttons">
                    {
                        this.props.data.buttons.map(({text, event}) =>
                            <button
                                className="button modal_button"
                                onClick={event}
                            >
                                {text}
                            </button>
                        )
                    }
                </div>
            </>
        )
    }
}