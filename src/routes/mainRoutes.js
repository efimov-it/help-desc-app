import MainPage from '../views/main-page'
import License from '../views/license'
import ControlPanel from '../views/control-panel'
import Settings from '../views/settings'

export default [
    {
        path: '/',
        component: MainPage
    },
    // {
    //     path: '/license/',
    //     component: License
    // },
    {
        path: '/control-panel/',
        component: ControlPanel
    },
    // {
    //     path: '/settings/',
    //     component: Settings
    // }
]