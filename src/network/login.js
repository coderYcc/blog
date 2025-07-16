import { request } from './index'

export function blogLoginIn(params) {
  return request({
		url: '/auth/login',
    data: params,
    method: "POST"
  });
}