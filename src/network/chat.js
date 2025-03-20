import { request } from './index'

export function queryAnswerInfo(params) {
  return request({
    url: '/chat/getAnswerInfo',
    headers: {   
      'Accept': 'text/event-stream',
      'Content-Type': 'application/json' // 设置请求头以指示请求体中的数据类型
    },
    data: params,
    method: "POST",
  });
}