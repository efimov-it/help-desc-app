import {combineReducers} from 'redux'

import menu from './menu'
import modals from './modals'
import user from './user'

const reducers = combineReducers({
    menu,
    modals,
    user
})

export default reducers