import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import './index.scss'

class Breadcrumbs extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            breadcrumbs: []
        }
    }
    componentDidMount () {
        const {history} = this.props
        const routes = {
            'control-panel': 'Панель управления',
            'profile': 'Профиль',
            'applications': 'Мои заявки',
            'users': 'Пользователи',
            'settings': 'Настройки'
        }
        const setBreadcrumbs = () => {
            this.setState({
                breadcrumbs: []
            })
            const paths = history.location.pathname.split('/')
            const breadcrumbs = []
            paths.forEach(path=>{
                if (path !== '') {
                    const lastPath = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].path : '/'
                    if (routes[path]) {
                        breadcrumbs.push({
                            name: routes[path],
                            path: lastPath+path+'/'
                        })
                    }
                    else {
                        const name = breadcrumbs[breadcrumbs.length - 1].name === 'Мои заявки' ? 'Заявка #'+path : path
                        breadcrumbs.push({
                            name: name,
                            path: '/'+path+'/'
                        })
                    }
                }
            })
            this.setState({
                breadcrumbs
            })
        }
        setBreadcrumbs()
        history.listen(()=>{
            setBreadcrumbs()
        })
    }
    render () {
        return (
            <div className="breadcrumbs controlPanelBlock">
                {
                    this.state.breadcrumbs.map(({path, name}, i) => 
                        <div
                            className="breadcrumbs_link"
                            key={i}
                        >
                            <Link
                                to={path}
                                className="link"
                            >
                                {name}
                            </Link>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withRouter(Breadcrumbs)