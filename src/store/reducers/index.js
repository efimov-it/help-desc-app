import {combineReducers} from 'redux'

import menu from './menu'
import modals from './modals'

const reducers = combineReducers({
    menu,
    modals
})

export default reducers