import UserActions from '../../actions/user/'
import initialState from '../../initialState'

export default (state = initialState.user, action) => {
    switch (action.type) {
        case UserActions.LOGIN :
            return {
                token: action.data.token,
                expiresIn: action.data.expiresIn,
                data: state.data
            }

        case UserActions.LOGOUT :
            return {
                token: null,
                expiresIn: null,
                data: {
                    name: null,
                    surName: null,
                    login: null,
                    role: null,
                    mail: null,
                    post: null
                }
            }

        case UserActions.SET_USER_DATA :
            return {
                ...state,
                data: action.data
            }

        default: return state
    }
}