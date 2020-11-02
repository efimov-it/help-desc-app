import React from 'react'
import './index.scss'

class ChatBackgroundPicker extends React.Component {
    render () {
        const backgrounds = this.props.backgroundsList
        return (
            <form
                action=""
                className="chatBackgroundPicker"
            >
                {
                    Object.keys(backgrounds).map(key=>(
                        <label
                            className="chatBackgroundPicker_item"
                            key={key}
                        >
                            <input
                                className="chatBackgroundPicker_radio"
                                type="radio"
                                name="background"
                                value={key}
                                checked={key === this.props.selectedName}
                            />
                            <div className="chatBackgroundPicker_wrapper">
                                <img
                                    className="chatBackgroundPicker_img"
                                    src={"/apperance/chat_bg_preview_"+key+".png"}
                                /> 
                            </div>
                        </label>
                    ))
                }
            </form>
        )
    }
}

export default ChatBackgroundPicker