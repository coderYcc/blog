import React, { memo, useEffect } from 'react'
import ArticleItem from './c-cpns/ArticleItem'
import EveryDay from './c-cpns/EveryDay';
import  { queryArticleList } from '../../../../network/article'
import { message, BackTop } from 'antd';
import {
  HomeWrapper
} from './style'
import { useState } from 'react'
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const Home = memo(() => {
  const [articleList, setArticleList] = useState([])
  useEffect(() => {
    queryArticleList().then((res) => {
      if(res?.data?.rows?.length) {
        setArticleList(res.data.rows)
      }
    }).catch(() => {
      message.error('文章列表获取失败，请稍后重试')
    })
  }, [])

  return (
    <HomeWrapper>
      <div className='article-list'>
        {
          articleList.map((item, index) => {
            return (
              <div key={item.article_id}>
                <ArticleItem
                  index={index}
                  article={item}
                >
                </ArticleItem>
              </div>
            )
          })
        }
      </div>
      <div className='article-log'>
        <EveryDay/>
      </div>
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </HomeWrapper>
  )
})

export default Home