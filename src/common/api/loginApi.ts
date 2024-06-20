import request from '../js/request.js'

export default function login(requestParams: object): Promise<any> {
    return request.post('/api/login', requestParams)
}