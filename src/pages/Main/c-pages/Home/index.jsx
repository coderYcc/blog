import React, { memo, useCallback, useEffect, useRef } from 'react'
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
  borderRadius: 10,
  backgroundColor: '#24292f',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
const Home = memo(() => {
  const [articleList, setArticleList] = useState([])
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const bottomRef = useRef(null)
  const isFirstLoad = useRef(false)

  const fetchArticleList = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    queryArticleList({page, pageSize}).then((res) => {
      if(res?.data?.rows?.length) {
        const data = res.data.rows
        const total = res.data?.pagination?.total
        setArticleList(prev => page === 1 ? data : [...prev, ...data])
        if(page === 1) {
          isFirstLoad.current = true
        }
        setHasMore(articleList.length + data.length < total);
      }
    }).catch(() => {
      message.error('文章列表获取失败，请稍后重试')
    }).finally(() => {
      setLoading(false);
    })
  }, [loading, hasMore, page, articleList.length])

  useEffect(() => {
    fetchArticleList()
    // eslint-disable-next-line
  }, [])

  // 监听滚动事件
  useEffect(() => {
    const node = bottomRef.current;
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore && !loading && isFirstLoad.current) {
        setPage(prev => prev + 1)
      }
    }, { threshold: 0.5 })
    if (node) {
      observer.observe(node);
    }
    // 清理函数
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [loading, hasMore])

  // 当页码变化时加载数据
  useEffect(() => {
    if (page > 1) {
      fetchArticleList();
    }
  }, [page, fetchArticleList]);

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
        {/* 底部监听元素 */}
        <div ref={bottomRef} className="loading-trigger">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          )}
          
          {!hasMore && !loading && articleList.length > 0 && (
            <div className="end-message">
            </div>
          )}
        </div>
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