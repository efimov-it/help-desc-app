import React from 'react'

import './index.scss'

export default class Modal extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isHidden: false
        }
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal() {
        this.setState({
            isHidden: true
        });
        if (typeof this.props.close === 'function')
            setTimeout(()=>{
                this.props.close();
            }, 300);
    }

    render () {
        return (
            <div className="modal_wrapper">
                <div className={'modal_background' + (this.state.isHidden ? ' modal_background__hidden' : '')}
                     onClick={this.closeModal} />

                <div className={'modal' + (this.state.isHidden ? ' modal__hidden' : '')}>
                    <header className="modal_header">
                        <span className="modal_header-title">
                            {this.props.header}
                        </span>
                        <div className="modal_close"
                             onClick={this.closeModal} />
                    </header>
                    <div className="modal_content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}