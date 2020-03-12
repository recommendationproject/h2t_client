import axios from 'axios';
import * as Config from '../../constants/Config';

export default function callApiUnauthWithBody(endpoint, method = 'GET', body){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body 
      });
}

export function callApiUnauthWithHeader(endpoint, method = 'GET', header) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    'Content-type': 'application/json; charset=utf-8',
    headers: header
  }).catch(err => {
  });
}