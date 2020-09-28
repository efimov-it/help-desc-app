import {bindActionCreators} from 'redux'

import menuActionsCreator from './actionsCreators/menu'
import modalsActionsCreator from './actionsCreators/modal'
import userActionsCreator from './actionsCreators/user'

export default function mapDispatchToProps (component) {
    switch (component) {
        case 'menu' : return dispatch => {
            return {
                setAdminMenu:     bindActionCreators(menuActionsCreator.setAdminMenu, dispatch),
                setGuestMenu:     bindActionCreators(menuActionsCreator.setGuestMenu, dispatch),
                setModeratorMenu: bindActionCreators(menuActionsCreator.setModeratorMenu, dispatch),
                setUserMenu:      bindActionCreators(menuActionsCreator.setUserMenu, dispatch),
                setMenuState:     bindActionCreators(menuActionsCreator.setMenuState, dispatch),
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                createModal: bindActionCreators(modalsActionsCreator.createModal, dispatch)
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

        case 'mainPage' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                createModal: bindActionCreators(modalsActionsCreator.createModal, dispatch)
            }
        }

        case 'applicationStatus' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal: bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createModal: bindActionCreators(modalsActionsCreator.createModal, dispatch)
            }
        }

        case 'addApplication' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal: bindActionCreators(modalsActionsCreator.closeModal, dispatch)
            }
        }

        case 'applicationSendCode' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal: bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createModal: bindActionCreators(modalsActionsCreator.createModal, dispatch)
            }
        }

        case 'auth' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal: bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createModal: bindActionCreators(modalsActionsCreator.createModal, dispatch),
                login: bindActionCreators(userActionsCreator.login, dispatch)
            }
        }

        default: return undefined
    }
}