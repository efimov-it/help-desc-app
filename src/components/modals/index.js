import React from 'react'
import {connect} from 'react-redux'

import mapDispatchToProps from '../../store/mapDispatchToProps'
import maoStateToProps from '../../store/mapStateToProps'
import './index.scss'

class Modals extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isHidden: false,
            backgroundIsHidden: false
        }
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal() {
        this.setState({
            isHidden: true,
            backgroundIsHidden: this.props.modals.length === 1
        },
        ()=>{
            setTimeout(()=>{
                this.props.closeModal()
                this.setState({
                    isHidden: false
                })
            }, 300)
        })
    }

    render () {
        return this.props.modals ?
                this.props.modals.length > 0 ?
                    <div className="modal_wrapper">
                        <div
                            className={'modal_background' + (this.props.modals.length === 0 || this.state.backgroundIsHidden ? ' modal_background__hidden' : '')}
                            onClick={this.closeModal}
                        />
                        
                        {
                            this.props.modals.map((modal, i) => (
                                <div
                                    className={'modal' + (this.state.isHidden ? ' modal__hidden' : '')}
                                    key={i}
                                >
                                    { modal.header ?
                                        <header className="modal_header">
                                            <span className="modal_header-title">
                                                {modal.header}
                                            </span>
                                            <div className="modal_close"
                                                onClick={this.closeModal} />
                                        </header> : ''
                                    }
                                    <div className="modal_content">
                                        <modal.content data={modal.data} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                : '' : ''
    }
}

export default connect(
    maoStateToProps('modals'),
    mapDispatchToProps('modals')
)(Modals)