import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ArticleItemWrapper
} from './style.js'
import LazyImage from '@/components/LazyImage'
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
      <LazyImage src={article.article_image} alt=""></LazyImage>
      <div>{article.article_description}</div>
    </ArticleItemWrapper>
  )
})

export default ArticleItem