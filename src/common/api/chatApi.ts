import axios from 'axios';

export function getEn2ChTransResult(requestParams: object): Promise<any> {
    const url = 'https://winstxnhdw-nllb-api.hf.space/api/v3/translate';
    const data = requestParams;
    return axios.post(url, data);
}

export function getSourceLanguageCode(requestParams: Object): Promise<any> {
    const url = 'https://winstxnhdw-nllb-api.hf.space/api/v3/detect_language';
    return axios.get(url, { params: requestParams });
}
