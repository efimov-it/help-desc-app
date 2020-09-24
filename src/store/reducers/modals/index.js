import modalsActions from '../../actions/modals'
import initialState from '../../initialState'

export default (state = initialState.modals, action) => {
    switch (action.type) {
        case modalsActions.CREATE_MODAL :
            return [...state, action.modal]
        case modalsActions.CREATE_RESULT_MODAL :
            return [...state, action.modal]
        case modalsActions.CLOSE_MODAL :
            state.pop()
            return [...state]

        default: return state
    }
}