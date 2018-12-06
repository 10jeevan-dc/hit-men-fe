import { isEmpty } from 'lodash';

const baseUrl = 'http://localhost:8080';

export const getRequest = endPoint => fetch(`${baseUrl}/${endPoint}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const postRequest = (endPoint, requestBody) => fetch(`${baseUrl}/${endPoint}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody),
});

export const patchRequest = (endPoint, params) => {
  if (!isEmpty(params)) {
    return fetch(`${baseUrl}/${endPoint}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }
  return fetch(`${baseUrl}/${endPoint}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
