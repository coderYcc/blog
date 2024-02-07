import React, { memo, useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { queryArticleInfo } from '../../../../network/article';
import { dateFormat } from '../../../../utils';
import { message } from 'antd';
import Catalog from './c-cpns/Catalog'
import {
  ArticleWrapper
} from './style.js'



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
    let list = [ ...articleLog.current.querySelectorAll("h1,h2,h3,h4,h5") ]
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
      <div className='article-log'>
        <Catalog cataLog={cataLog}></Catalog>
      </div>
    </ArticleWrapper>
  )
})

export default Article