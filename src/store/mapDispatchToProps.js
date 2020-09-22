import {bindActionCreators} from 'redux'

import menuActionCreators from './actionsCreators/menu'

export default function mapDispatchToProps (component) {
    switch (component) {
        case 'menu' : return dispatch => {
            return {
                setAdminMenu:     bindActionCreators(menuActionCreators.setAdminMenu, dispatch),
                setGuestMenu:     bindActionCreators(menuActionCreators.setGuestMenu, dispatch),
                setModeratorMenu: bindActionCreators(menuActionCreators.setModeratorMenu, dispatch),
                setUserMenu:      bindActionCreators(menuActionCreators.setUserMenu, dispatch),
                setMenuState:     bindActionCreators(menuActionCreators.setMenuState, dispatch)
            }
        }
        
        case 'header': return dispatch => {
            return {
                setMenuState:     bindActionCreators(menuActionCreators.setMenuState, dispatch)
            }
        }

        default: return undefined
    }
}