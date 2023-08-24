import { request } from './index'

export function queryArtilceList() {
  return request({
		url: '/getArticle',
  });
}