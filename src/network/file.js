import { request } from './index'

export function getOssInfo() {
  return request({
		url: '/file/getOssInfo',
    method: "GET"
  });
}

export function saveFileInfo(params) {
  return request({
		url: '/file/addFile',
    data: {
      params
    },
    method: "POST"
  });
}

export function queryFileList() {
  return request({
		url: '/file/getFileList',
  });
}