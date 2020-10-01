import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../../store/mapStateToProps'
import mapDispatchToProps from '../../../store/mapDispatchToProps'

import LoadingIndicator from '../../loadingIndicator'
import './index.scss'

class ApplicationSetExecutor extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            isReady: false,
            executorsList: [],
            selectedId: null
        }
    }
    componentDidMount () {
        global.sendRequest({
            url: '/applications/setExecutor/executors/',
            headers: {
                token: this.props.data.token
            }
        })
        .then(resp=>{
            this.setState({
                isReady: true,
                executorsList: resp.map(executor => {
                    return {
                        fullName: executor.full_name,
                        post: executor.post,
                        id: executor.id_user
                    }
                })
            })
        })
        .catch(err=>{
            this.props.createResultModal(err, 'error')
        })
    }

    changeSelectedId (e) {
        this.setState({
            selectedId: e.target.value
        })
    }

    sendExecutorId (e) {
        e.preventDefault()
        this.props.createModal({
            content: LoadingIndicator
        })
        if(this.state.selectedId === null) {
            this.props.createResultModal('Вы не выбрали исполнителя.', 'error')
        }
        else {
            global.sendRequest({
                url: '/applications/setExecutor/',
                method: 'post',
                headers: {
                    token: this.props.data.token
                },
                data: 'key=' + this.props.data.applicationCode + '&id_user=' + this.state.selectedId
            })
            .then(()=>{
                this.props.closeModal()
                this.props.closeModal()
                if (typeof this.props.data.onSubmit === 'function') {
                    this.props.data.onSubmit()
                }
                this.props.createResultModal('Исполнитель для заявки #' + this.props.data.applicationCode + ' успешно назначен.', 'success')
            })
            .catch(err=>{
                this.props.closeModal()
                this.props.createResultModal(err, 'error')
            })
        }
    }

    render () {
        console.log(this.props);
        return (
            this.state.isReady ?
            <>
                <form
                    id="executorForm"
                    action=""
                    className="applicationExecutor"
                    onSubmit={e=>this.sendExecutorId.apply(this, [e])}
                >
                    {
                        this.state.executorsList.map(({fullName, post, id})=>
                            <label
                                key={id}
                                className="applicationExecutor_executor"
                            >
                                <input
                                    className="applicationExecutor_input"
                                    type="radio"
                                    value={id}
                                    name="id_user"
                                    onChange={e=>this.changeSelectedId.apply(this, [e])}
                                />
                                <div className="applicationExecutor_content">
                                    <p className="applicationExecutor_fullName">{fullName}</p>
                                    <p className="applicationExecutor_post">{post}</p>
                                </div>
                            </label>
                        )
                    }
                </form>
                
                <div className="modal_buttons">
                    <button 
                        className="button"
                        form="executorForm"
                        disabled={this.state.selectedId === null}
                        title={this.state.selectedId === null ? 'Выберите исполнителя.' : 'Назначить исполнителя.'}
                    >Назначить</button>
                </div>
            </> :
            <LoadingIndicator />
        )
    }
}

export default connect(
    mapStateToProps('applicationSetExecutor'),
    mapDispatchToProps('applicationSetExecutor')
)(ApplicationSetExecutor)