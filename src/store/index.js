import {createStore} from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

//For debug
store.subscribe(() => console.info(store.getState()))

export default store