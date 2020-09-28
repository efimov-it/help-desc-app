import LOGIN from '../../actions/user/login'

export default (token) => {
    return {
        type: LOGIN,
        token
    }
}