import React, { memo, useState, useRef } from 'react'
import { marked } from 'marked';
import hljs from "highlight.js";
import { Row, Col, Input, Button, message, Modal } from 'antd';
import 'highlight.js/styles/monokai-sublime.css';
import { EditWrapper } from './style';
import { saveArticleInfo } from '../../../../network/article'
const { TextArea } = Input

const AddArticle = memo(() => {
  const [articleDescription, setArticleDescription] = useState('')  // 文章描述内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') // markdown转换为html的内容
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalHoldOpen, setIsModalHoldOpen] = useState(false)
  const articleTitle = useRef(null)
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  })

  const changeContent = (e) => {
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeDescription = (e) => {
    let html = marked(e.target.value)
    setArticleDescription(html)
    console.log(articleDescription);
  }

  const handleSaveArticle = () => {
    if(!markdownContent) return
    let params = {
      articleTitle: articleTitle.current.state.value,
      articleContent: markdownContent,
      articleDesc: '描述',
      articleImage: 'http://120.78.186.182/images/cart.jpg',
    }
    saveArticleInfo(params).then(() => {
      message.success('保存成功');
    }).catch(() => {
      message.error('文章保存失败，请稍后重试');
    })
  }

  const handleHoldArticle = () => {
    if(!markdownContent) return
    let params = {
      articleTitle: articleTitle.current.state.value,
      articleContent: markdownContent,
      articleDesc: '描述',
      articleImage: 'http://120.78.186.182/images/cart.jpg',
    }
    saveArticleInfo(params).then(() => {
      message.success('暂存成功');
    }).catch(() => {
      message.error('文章暂存失败，请稍后重试');
    })
  }

  const showModal = () => {
    setIsModalOpen(true)
  };
  const showHoldModal = () => {
    setIsModalHoldOpen(true)
  };

  const handleCancel = () => {
    setIsModalOpen(false)
    setIsModalHoldOpen(false)
  }

  return (
    <EditWrapper>
      <Row gutter={5}>
        <Col span={24}>
          <Row gutter={16} style={{'margin-bottom': '10px'}}>
            <Col span={10}><Input ref={articleTitle} placeholder='title'/></Col>
            <Col span={2}>
              <Button onClick={showModal}>保存</Button>
              <Modal title="温馨提示" visible={isModalOpen} onOk={handleSaveArticle} onCancel={handleCancel}>
                <p>是否确定保存文章</p>
              </Modal>
            </Col>
            <Col span={2}>
              <Button onClick={showHoldModal}>暂存</Button>
              <Modal title="温馨提示" visible={isModalHoldOpen} onOk={handleHoldArticle} onCancel={handleCancel}>
                <p>是否确定暂存文章</p>
              </Modal>
            </Col>
          </Row>
          <Row gutter={16} style={{'margin-bottom': '10px'}}>
            <Col span={8}>
              <TextArea
                className="article-desc"
                rows={35}
                onChange={changeDescription}
                onPressEnter={changeDescription}
                placeholder="文章描述"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </EditWrapper>
  )
})

export default AddArticle