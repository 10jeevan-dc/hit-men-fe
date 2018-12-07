import { isEmpty } from 'lodash';
import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getRequest = endPoint => axios(`${baseUrl}/${endPoint}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const postRequest = (endPoint, requestBody) => axios(`${baseUrl}/${endPoint}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: JSON.stringify(requestBody),
});

export const patchRequest = (endPoint, params) => {
  if (!isEmpty(params)) {
    return axios(`${baseUrl}/${endPoint}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(params),
    });
  }
  return axios(`${baseUrl}/${endPoint}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
