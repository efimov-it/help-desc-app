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

        default: return undefined
    }
}