import Axios from 'axios'
import errors from './errors.json'

export default function ({
    url,
    method,
    data,
    headers
}) {
    const isInnerRequest = url.indexOf('http') !== 0
    return new Promise((resolve, reject)=>{
        Axios({
            url: isInnerRequest ? global.apiUrl + url : url,
            method,
            data,
            headers
        }).then(resp => {
            if (isInnerRequest) {
                const respData = resp.data
                if(respData.status === 'success') {
                    resolve({
                        status: 'success',
                        data: respData.data
                    })
                }
                else {
                    const errorCode = respData.message
                    if (errors[errorCode] !== undefined) {
                        reject({
                            status: 'error',
                            message: errors[errorCode][global.lang]
                        })
                    }
                    reject({
                        status: 'error',
                        message: errors.default[global.lang]
                    })
                }
            }
            else {
                resolve(resp)
            }
        }).catch(err => {
            if (isInnerRequest) {
                reject({
                    status: 'error',
                    message: errors.network[global.lang]
                })
            }
            else {
                reject(err)
            }
        })
    })
}