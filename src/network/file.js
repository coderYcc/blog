import { request } from './index'

export function getOssInfo() {
  return request({
		url: '/file/getOssInfo',
    method: "GET"
  });
}
