import CREATE_MODAL from '../../actions/modals/create_modal'

export default (modal) => {
    return {
        type: CREATE_MODAL,
        modal
    }
}