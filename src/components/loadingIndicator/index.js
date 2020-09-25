import React from 'react'

import './index.scss'

export default class LoadingIndicator extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            dots: ''
        }
    }

    componentDidMount () {
        setInterval(()=>{
            if (this.state.dots !== '...') {
                this.setState({
                    dots: this.state.dots + '.'
                })
            }
            else {
                this.setState({
                    dots: ''
                })
            }
        }, 600)
    }

    render () {
        return (
            <div 
                className="loadingIndicator"
                text={"Загрузка" + this.state.dots}
            >
                <i className="loadingIndicator_item loadingIndicator_item__1 material-icons">settings</i>
                <i className="loadingIndicator_item loadingIndicator_item__2 material-icons">settings</i>
                <i className="loadingIndicator_item loadingIndicator_item__3 material-icons">settings</i>
            </div>
        )
    }
}