import {bindActionCreators} from 'redux'

import menuActionsCreator from './actionsCreators/menu'
import modalsActionsCreator from './actionsCreators/modal'

export default function mapDispatchToProps (component) {
    switch (component) {
        case 'menu' : return dispatch => {
            return {
                setAdminMenu:     bindActionCreators(menuActionsCreator.setAdminMenu, dispatch),
                setGuestMenu:     bindActionCreators(menuActionsCreator.setGuestMenu, dispatch),
                setModeratorMenu: bindActionCreators(menuActionsCreator.setModeratorMenu, dispatch),
                setUserMenu:      bindActionCreators(menuActionsCreator.setUserMenu, dispatch),
                setMenuState:     bindActionCreators(menuActionsCreator.setMenuState, dispatch)
            }
        }
        
        case 'header': return dispatch => {
            return {
                setMenuState: bindActionCreators(menuActionsCreator.setMenuState, dispatch)
            }
        }

        case 'modals' : return dispatch => {
            return {
                closeModal: bindActionCreators(modalsActionsCreator.closeModal, dispatch)
            }
        }

        default: return undefined
    }
}