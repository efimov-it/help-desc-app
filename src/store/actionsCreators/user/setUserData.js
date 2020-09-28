import SET_USER_DATA from '../../actions/user/set_user_data'

export default (data) => {
    return {
        type: SET_USER_DATA,
        data
    }
}