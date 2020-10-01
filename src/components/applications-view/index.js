import React from 'react'
import {connect} from 'react-redux'
import mapStateToProps from '../../store/mapStateToProps'
import mapDispatchToProps from '../../store/mapDispatchToProps'
import './index.scss'
import ApplicationCard from './application-card'

class ApplicationsView extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            toolsMobState: false,
            searchValues: {
                search: '',
                sortBy: 'date',
                sortDirection: 'desc',
                date: '',
                page: 1
            },
            applications: [],
            pagination: {
                total: null,
                loaded: null,
                next: null
            }
        }
    }

    componentDidMount () {
        this.initSearch()
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
        searchValues.sortDirection = direction
        this.setState({
            searchValues
        })
    }

    initSearch (e) {
        if(e) e.preventDefault()

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
                applications
            })
        })
        .catch(err=>{
            this.props.createResultModal(err, 'error')
        })
    }

    render () {
        return (
            <>
                <form
                    className="applicationsView_tools"
                    action=""
                    onSubmit={e=>this.initSearch.apply(this, [e])}
                >
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
                            name="sortBy"
                            className="applicationsView_sortBy"
                            onChange={e=>this.changeValueOfSearch.apply(this, [e])}
                            value={this.state.searchValues.sortBy}
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
                            className={"applicationsView_sortDirection material-icons" + (this.state.searchValues.sortDirection === 'desc' ? ' applicationsView_sortDirection__active' : '')}
                            title="Сортировать по убыванию"
                            onClick={()=>this.changeSortDirections.apply(this, ['desc'])}
                        >keyboard_arrow_down</button>
                        <button
                            className={"applicationsView_sortDirection material-icons" + (this.state.searchValues.sortDirection === 'asc' ? ' applicationsView_sortDirection__active' : '')}
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

                <div className="applicationsView_wrapper">
                    {
                        this.state.applications.length > 0 ?
                            this.state.applications.map((application, i) => 
                                <ApplicationCard
                                    className="applicationsView_application"
                                    key={i}
                                    data={application}
                                    state={this.props.state}
                                    onApplicationStateChange={()=>this.initSearch.apply(this)}
                                />
                            ) : ''
                    }
                </div>
            </>
        )
    }
}

export default connect(
    mapStateToProps('applicationView'),
    mapDispatchToProps('applicationView')
)(ApplicationsView)