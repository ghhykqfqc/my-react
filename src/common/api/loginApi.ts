import request from '../js/request.js'

export default function login(username: string, password: string): Promise<any> {
    return request.post('/api/login', { username, password })
};