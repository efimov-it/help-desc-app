export default function mapStateToProps (component) {
    switch (component) {
        case 'menu' : return state => {
            return {
                menu: state.menu
            }
        }
        case 'app' : return state => {
            return {
                state
            }
        }

        default: return undefined
    }
}