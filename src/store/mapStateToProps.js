export default function mapStateToProps (component) {
    switch (component) {
        case 'menu' : return state => {
            return {
                menu: state.menu
            }
        }
        case 'modals' : return state => {
            return {
                modals: state.modals
            }
        }
        case 'menuUser' : return state => {
            return {
                user: state.user.data
            }
        }
        case 'controlPanel' : return state => {
            return {
                user: state.user
            }
        }
        case 'controlPanelMain' : return state => {
            return {
                user: state.user
            }
        }

        case 'applicationCard' : return state => {
            return {
                user: state.user
            }
        }

        case 'myApplication' : return state => {
            return {
                user: state.user
            }
        }

        case 'applicationPage' : return state => {
            return {
                user: state.user
            }
        }

        case 'profile' : return state => {
            return {
                user: state.user
            }
        }

        case 'users' : return state => {
            return {
                user: state.user
            }
        }

        case 'settings' : return state => {
            return {
                user: state.user
            }
        }

        default: return undefined
    }
}