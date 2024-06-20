import request from '../js/request.js'

export default function getFlowList(requestParams: object): Promise<any> {
    return request.post('/api/getFlowList', requestParams)
}