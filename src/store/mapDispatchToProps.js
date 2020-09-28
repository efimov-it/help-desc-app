import {bindActionCreators} from 'redux'

import menuActionsCreator from './actionsCreators/menu'
import modalsActionsCreator from './actionsCreators/modal'
import userActionsCreator from './actionsCreators/user'

export default function mapDispatchToProps (component) {
    switch (component) {
        case 'app' : return dispatch => {
            return {
                setAdminMenu:     bindActionCreators(menuActionsCreator.setAdminMenu, dispatch),
                setModeratorMenu: bindActionCreators(menuActionsCreator.setModeratorMenu, dispatch),
                setUserMenu:      bindActionCreators(menuActionsCreator.setUserMenu, dispatch),
                setGuestMenu:     bindActionCreators(menuActionsCreator.setGuestMenu, dispatch),
                login: bindActionCreators(userActionsCreator.login, dispatch),
                setUserData: bindActionCreators(userActionsCreator.setUserData, dispatch),
                createModal: bindActionCreators(modalsActionsCreator.createModal, dispatch),
                closeModal: bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch)
            }
        }

        case 'menu' : return dispatch => {
            return {
                setGuestMenu:      bindActionCreators(menuActionsCreator.setGuestMenu, dispatch),
                setMenuState:      bindActionCreators(menuActionsCreator.setMenuState, dispatch),
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                createModal:       bindActionCreators(modalsActionsCreator.createModal, dispatch)
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
                createModal:       bindActionCreators(modalsActionsCreator.createModal, dispatch)
            }
        }

        case 'applicationStatus' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal:        bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createModal:       bindActionCreators(modalsActionsCreator.createModal, dispatch)
            }
        }

        case 'addApplication' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal:        bindActionCreators(modalsActionsCreator.closeModal, dispatch)
            }
        }

        case 'applicationSendCode' : return dispatch => {
            return {
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal:        bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createModal:       bindActionCreators(modalsActionsCreator.createModal, dispatch)
            }
        }

        case 'auth' : return dispatch => {
            return {
                setAdminMenu:      bindActionCreators(menuActionsCreator.setAdminMenu, dispatch),
                setModeratorMenu:  bindActionCreators(menuActionsCreator.setModeratorMenu, dispatch),
                setUserMenu:       bindActionCreators(menuActionsCreator.setUserMenu, dispatch),
                setGuestMenu:      bindActionCreators(menuActionsCreator.setGuestMenu, dispatch),
                createResultModal: bindActionCreators(modalsActionsCreator.createResultModal, dispatch),
                closeModal:        bindActionCreators(modalsActionsCreator.closeModal, dispatch),
                createModal:       bindActionCreators(modalsActionsCreator.createModal, dispatch),
                login:             bindActionCreators(userActionsCreator.login, dispatch),
                setUserData:       bindActionCreators(userActionsCreator.setUserData, dispatch)
            }
        }

        case 'menuUser' : return dispatch => {
            return {
                setMenuState: bindActionCreators(menuActionsCreator.setMenuState, dispatch),
                createModal:  bindActionCreators(modalsActionsCreator.createModal, dispatch),
                logout:       bindActionCreators(userActionsCreator.logout, dispatch),
                setGuestMenu: bindActionCreators(menuActionsCreator.setGuestMenu, dispatch)
            }
        }

        default: return undefined
    }
}