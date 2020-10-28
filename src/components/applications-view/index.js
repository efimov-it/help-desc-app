import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import './index.scss'
import ApplicationCard from './application-card'
import LoadingIndicator from '../loadingIndicator'
import ApplicationEmptyList from './application-emptyList'

class ApplicationsView extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            toolsMobState: false,
            searchValues: {
                search: '',
                sort_by: 'date',
                sort: 'asc',
                date: '',
                page: 1
            },
            loading: false,
            applications: null,
            viewMode: 'blocks',
            pagination: {
                total: null,
                loaded: null,
                next: null
            }
        }
    }

    componentDidMount () {
        const settings = JSON.parse(localStorage.getItem('settings'))
        const viewMode = settings ? settings.applications ? settings.applications.viewMode : 'blocks' : 'blocks'
        this.setState({
            viewMode
        })
        if (settings) {
            if (settings.applications) {
                if (!settings.applications.viewMode) {
                    const newSettings = JSON.parse(localStorage.getItem('settings'))
                    newSettings.applications.viewMode = 'blocks'
                    localStorage.setItem('settings', JSON.stringify(newSettings))
                }
            }
            else {
                const newSettings = JSON.parse(localStorage.getItem('settings'))
                newSettings.applications = {
                    viewMode: 'blocks'
                }
                localStorage.setItem('settings', JSON.stringify(newSettings))
            }
        }
        else {
            localStorage.setItem('settings', JSON.stringify({
                applications: {
                    viewMode: 'blocks'
                }
            }))
        }
        this.initSearch()
    }

    changeViewMode (e) {
        e.preventDefault()
        this.setState ({
            viewMode: this.state.viewMode === 'blocks' ? 'strings' : 'blocks'
        }, ()=>{
            const settings = JSON.parse(localStorage.getItem('settings'))
            if (settings) {
                if (settings.applications) {
                    const newSettings = JSON.parse(localStorage.getItem('settings'))
                    newSettings.applications.viewMode = this.state.viewMode
                    localStorage.setItem('settings', JSON.stringify(newSettings))
                }
                else {
                    const newSettings = JSON.parse(localStorage.getItem('settings'))
                    newSettings.applications = {
                        viewMode: this.state.viewMode
                    }
                    localStorage.setItem('settings', JSON.stringify(newSettings))
                }
            }
            else {
                localStorage.setItem('settings', JSON.stringify({
                    applications: {
                        viewMode: this.state.viewMode
                    }
                }))
            }
        })
    }

    changeToolsState () {
        this.setState({
            toolsMobState: !this.state.toolsMobState
        })
    }

    changeValueOfSearch (e) {
        e.persist()
        const {searchValues} = this.state
        searchValues[e.target.name] = e.target.value
        searchValues.page = 1
        this.setState({
            searchValues
        })

        if (e.target.type !== 'text') {
            if (e.target.type === 'date' && e.target.value.length != 10 && e.target.value !== '') {
                return
            }
            this.initSearch.apply(this)
        }
    }

    changeSortDirections (direction) {
        const {searchValues} = this.state
        searchValues.sort = direction
        this.setState({
            searchValues
        })
    }

    initSearch (e) {
        if(e) e.preventDefault()

        this.setState({
            loading: true
        })

        let url = this.props.state === 'created' ?
                            '/applications/' :
                            this.props.state === 'processing' ?
                                        '/applications/my/' :
                                        '/applications/completed/'

        const {searchValues} = this.state
        let data = ""
        
        Object.keys(searchValues).forEach(key=>{
            if(searchValues[key] !== ""){
                data += "&" + key+"="+searchValues[key]
            }
        });

        url += "?" + data.substring(1)

        global.sendRequest ({
            url,
            headers: {
                token: this.props.token
            }
        })
        .then(resp=>{
            this.setState({
                loading: false
            })
            let applications = []

            if (searchValues.page === 1) {
                applications = resp.applications
            }
            else {
                applications = [
                    ...this.state.applications,
                    ...resp.applications
                ]
            }

            this.setState({
                applications,
                pagination: {
                    total: parseInt(resp.pagination.tottal_count),
                    loaded: parseInt(resp.pagination.loaded_count),
                    next: parseInt(resp.pagination.next_page_count)
                }
            })
        })
        .catch(err=>{
            this.setState({
                loading: false
            })
            this.props.createResultModal(err, 'error')
        })
    }

    nextPage () {
        const {searchValues} = this.state
        searchValues.page++
        this.setState({
            searchValues
        }, this.initSearch)
    }

    render () {
        return (
            <>
                <form
                    className="applicationsView_tools"
                    action=""
                    onSubmit={e=>this.initSearch.apply(this, [e])}
                >
                    <button
                        className="applicationsView_viewModeButton material-icons"
                        onClick={(e)=>this.changeViewMode.apply(this, [e])}
                        title={this.state.viewMode === 'blocks' ? "Переключить на строчный режим." : "Переключить на плиточный режим"}
                    >
                        {this.state.viewMode === 'blocks' ? "view_stream" : "view_module"}
                    </button>
                    <div className="applicationsView_search">
                        <input
                            name="search"
                            className="applicationsView_searchBox"
                            placeholder="Поиск по заявкам..."
                            title="Поле для ввода поискового запроса"
                            value={this.state.searchValues.search}
                            onChange={e=>this.changeValueOfSearch.apply(this, [e])}
                        />
                        <button
                            title="Поиск по заявкам"
                            className="applicationsView_searchButton material-icons"
                        >search</button>
                    </div>
                    <div className={"applicationsView_sort" + (!this.state.toolsMobState ? ' applicationsView_tools__hidden' : '')}>
                        <select
                            name="sort_by"
                            className="applicationsView_sortBy"
                            onChange={e=>this.changeValueOfSearch.apply(this, [e])}
                            value={this.state.searchValues.sort_by}
                        >
                            <option value="full_name">По Ф.И.О. заявителя</option>
                            <option value="phone_type">По типу телефона заявителя</option>
                            <option value="phone_number">По номеру телефона заявителя</option>
                            <option value="mail">По адресу эл. почты заявителя</option>
                            <option value="office">По номеру кабинета заявителя</option>
                            <option value="unit">По названию подразделения</option>
                            <option value="dept">По названию отдела</option>
                            <option value="date">По дате подачи заявки</option>
                        </select>
                        <button
                            className={"applicationsView_sortDirection material-icons" + (this.state.searchValues.sort === 'desc' ? ' applicationsView_sortDirection__active' : '')}
                            title="Сортировать по убыванию"
                            onClick={()=>this.changeSortDirections.apply(this, ['desc'])}
                        >keyboard_arrow_down</button>
                        <button
                            className={"applicationsView_sortDirection material-icons" + (this.state.searchValues.sort === 'asc' ? ' applicationsView_sortDirection__active' : '')}
                            title="Сортировать по возрастанию"
                            onClick={()=>this.changeSortDirections.apply(this, ['asc'])}
                        >keyboard_arrow_up</button>
                    </div>
                    <label className={"applicationsView_date" + (!this.state.toolsMobState ? ' applicationsView_tools__hidden' : '')}>
                        <input
                            type="date"
                            className="applicationsView_dateInput"
                            name="date"
                            title="Дата подачи заявки"
                            placeholder="Дата подачи заявки"
                            onChange={e=>this.changeValueOfSearch.apply(this, [e])}
                            value={this.state.searchValues.date}
                        />
                    </label>

                    <button
                        className="applicationsView_toolsMore"
                        onClick={()=>this.changeToolsState.apply(this)}
                    >
                        {
                            !this.state.toolsMobState ?
                                'Развернуть' : 'Свернуть'
                        }
                    </button>
                </form>

                {
                    this.state.applications === null ?
                    <LoadingIndicator /> :
                    this.state.applications.length !== 0 ?
                        <div className="applicationsView_wrapper">
                            {
                                this.state.applications.length > 0 ?
                                    this.state.applications.map((application, i) => 
                                        <ApplicationCard
                                            className={(this.state.viewMode !== 'blocks' ? 'applicationsView_application__strings ' : '') + "applicationsView_application"}
                                            key={i}
                                            data={application}
                                            state={this.props.state}
                                            viewMode={this.state.viewMode}
                                            onApplicationStateChange={()=>this.initSearch.apply(this)}
                                        />
                                    ) : ''
                            }
                            {
                                this.state.applications.length > 0 ?
                                <div className="applicationsView_paginationWrapper">
                                    <div className="applicationsView_pagination">
                                        {
                                            this.state.loading === true && this.state.searchValues.page > 1 ?
                                            <LoadingIndicator /> :
                                            <>
                                                <p className="applicationsView_paginationText">Заявок загружено: {this.state.pagination.loaded}</p>
                                                <p className="applicationsView_paginationText">Всего: {this.state.pagination.total}</p>
                                                {
                                                    this.state.pagination.next > 0 ?
                                                        <div
                                                            className="button"
                                                            onClick={()=>this.nextPage.apply(this)}
                                                        >Загрузить ещё {this.state.pagination.next}</div> : ''
                                                }
                                            </>
                                        }
                                    </div>
                                </div> : ''
                            }
                        </div> :
                    <ApplicationEmptyList />
                }
            </>
        )
    }
}

export default connect(
    mapStateToProps('applicationView'),
    mapDispatchToProps('applicationView')
)(ApplicationsView)