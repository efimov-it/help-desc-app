import SET_MENU_STATE from '../../actions/menu/set_menu_state'

export default (value) => {
    return {
        type: SET_MENU_STATE,
        menuState: value
    }
}