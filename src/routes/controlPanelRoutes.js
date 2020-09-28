import ControlPanelMain from '../views/control-panel/main'
import Profile from '../views/control-panel/profile'
import Applications from '../views/control-panel/applications'
import Users from '../views/control-panel/users'
import Settings from '../views/settings'

export default [
    {
        path: '/control-panel/',
        component: ControlPanelMain
    },
    {
        path: '/control-panel/profile/',
        component: Profile
    },
    {
        path: '/control-panel/applications/',
        component: Applications
    },
    {
        path: '/control-panel/users/',
        component: Users
    },
    {
        path: '/control-panel/settings/',
        component: Settings
    },
]