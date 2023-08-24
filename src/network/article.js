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

export function queryArticleList() {
  return request({
		url: '/article/getArticleList',
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