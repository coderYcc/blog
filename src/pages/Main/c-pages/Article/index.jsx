import React, { memo, useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { queryArticleInfo } from '../../../../network/article';
import { dateFormat } from '../../../../utils';
import { message, BackTop } from 'antd';
import Catalog from './c-cpns/Catalog'
import {
  ArticleWrapper, CatalogButton
} from './style.js'
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

const renderer = new marked.Renderer()
marked.setOptions({
  renderer: renderer,
  gfm: true, 
  pedantic: false, 
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})
const Article = memo((props) => {
  const articleLog = useRef()
  const [article, setArticle] = useState({})
  const [cataLog, setCatalog] = useState([])
  const articleId  = props.location.pathname.split("/")[3]
  const [showCatalog, setShowCatalog] = useState(false) // 默认显示
  const [isMobile, setIsMobile] = useState(false)

  // 检测是否为移动端
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize() // 初始化
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    let params = {
      articleId
    }
    queryArticleInfo(params).then((res) => {
      if(res.data.rows.length) {
        setArticle(res.data.rows[0])
      }
    }).catch(() => {
      message.error('文章详情获取失败，请稍后重试')
    })
  }, [articleId]);

  useEffect(() => {
    let list = [ ...articleLog.current.querySelectorAll("h1,h2,h3,h4,h5,h6") ]
    let logList = list.map((item) => {
      return {
        href: '#' + item.id,
        title: item.innerText,
        level: item.localName.substr(1),
        children: []
      }
    })
    let node = logList[0] // 第一个节点
    let cataLog = [ node ]
    for(let i = 1; i < logList.length; i++) {
      if(node.level < logList[i].level) {
        node.children.push(logList[i])
      }else {
        node = logList[i]
        cataLog.push(node)
      }
    }
    if(cataLog[0]) {
      setCatalog(cataLog)
    }
  },[article.article_title])

  const CatalogDrawer = ({ visible, onClose, children }) => {
    return (
      <>
        {/* 遮罩层 */}
        {visible && (
          <div
            className="drawer-mask"
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
        )}
  
        {/* 抽屉内容 */}
        <div
          className="drawer-content"
          style={{
            position: 'fixed',
            top: 0,
            right: visible ? 0 : '-80%',
            width: '80%',
            height: '100%',
            backgroundColor: '#fff',
            boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
            transition: 'right 0.3s ease',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>目录</h3>
            <button onClick={onClose} style={{ background: '#f0f0f0', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              ✕
            </button>
          </div>
          {children}
        </div>
      </>
    )
  }

  return (
    <ArticleWrapper>
      <div className='article-content'>
        <div className='article-title'>{article.article_title}</div>
        <div className='article-time'>{dateFormat(article.create_time, 'yyyy-MM-dd hh:mm:ss')}</div>
        <img className='article-img' src={article.article_image} alt="" />
        <div className='article-desc'>
          <div className='desc-title'>前言</div>
          <div className='desc-content'>{article.article_description}</div>
        </div>
        <div className='article-body'>正文</div>
        <div 
          ref={articleLog} 
          className='markdown-content'
          dangerouslySetInnerHTML={{ __html: article.article_content }}
        >
        </div>
      </div>
      {!isMobile && (
        <div className='article-log'>
          <Catalog cataLog={cataLog}></Catalog>
        </div>
      )}
      
      {isMobile && (
        <CatalogButton onClick={() => setShowCatalog(true)}>
          目录
        </CatalogButton>
      )}

      {isMobile && (
        <CatalogDrawer visible={showCatalog} onClose={() => setShowCatalog(false)}>
          <Catalog cataLog={cataLog} />
        </CatalogDrawer>
      )}
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </ArticleWrapper>
  )
})

export default Article