import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ArticleItemWrapper
} from './style.js'
const ArticleItem = memo((props) => {
  const {article} = props
  const history =  useHistory()
  const gotoArticleDetail = (id) => {
    history.push(`/main/article/${id}`,{
      key: Date.now() 
    })
  }
  return (
    <ArticleItemWrapper onClick={() => gotoArticleDetail(article.article_id)}>
      <h2>{article.article_title}</h2>
      {/* <img src={article.article_image} alt=""/> */}
      <img src="https://blog-1303885568.cos.ap-chengdu.myqcloud.com/img/DSY-1646457668889.webp?imageView2/q/40" alt=""/>
      <div>{article.article_description}</div>
    </ArticleItemWrapper>
  )
})

export default ArticleItem