import LOGIN from '../../actions/user/login'

export default (token, expiresIn) => {
    return {
        type: LOGIN,
        data: {
            token,
            expiresIn
        }
    }
}