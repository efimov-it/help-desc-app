import menuActions from '../../actions/menu'
import initialState from '../../initialState'

export default (state = initialState.menu, action) => {
    switch(action.type) {
        case menuActions.SET_ADMIN_MENU :
            return {...state, items: action.menuItems}

        case menuActions.SET_GUEST_MENU :
            return {...state, items: action.menuItems}

        case menuActions.SET_MODERATOR_MENU :
            return {...state, items: action.menuItems}

        case menuActions.SET_USER_MENU :
            return {...state, items: action.menuItems}

        case menuActions.SET_MENU_STATE :
            return {...state, isShown: action.menuState}

        default: return state
    }
}