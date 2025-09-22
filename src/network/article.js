import { request } from './index'

export function saveArticleInfo(params) {
  return request({
		url: '/article/addArticle',
    data: {
      params
    },
    method: "POST"
  });
}

export function queryArticleList(params) {
  return request({
		url: '/article/getArticleList',
    data: {
      params
    },
    method: "POST"
  });
}

export function queryArticleInfo(params) {
  return request({
		url: '/article/getArticleDetail',
    data: {
      params
    },
    method: "POST"
  });
}