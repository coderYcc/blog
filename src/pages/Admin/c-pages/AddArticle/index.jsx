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
    renderer: new marked.Renderer(), // 用于自定义输出 HTML 的渲染器
    gfm: true, // 启用 GitHub 风格的 Markdown。默认为 true
    pedantic: false, 
    sanitize: false,
    tables: true,
    breaks: true, // 将行内的换行符转换为 <br>
    smartLists: true, // 启用智能列表。即自动将 - 和 * 转换为无序列表，而将数字和 . 转换为有序列表。
    smartypants: false, // 启用智能标点。不自动将引号和破折号转换为智能标点。
    highlight: function (code) { // 用于高亮代码块的函数
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
  }

  const handleSaveArticle = () => {
    if(!markdownContent || !articleDescription) {
      message.success('请完善文章内容');
      return void 0
    }
    let params = {
      articleTitle: articleTitle.current.state.value,
      articleContent: markdownContent,
      articleDesc: articleDescription,
      articleImage: 'http://120.78.186.182/images/cart.jpg',
    }
    saveArticleInfo(params).then(() => {
      message.success('保存成功');
      handleCancel()
    }).catch(() => {
      message.error('文章保存失败，请稍后重试');
      handleCancel()
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
      handleCancel()
    }).catch(() => {
      message.error('文章暂存失败，请稍后重试');
      handleCancel()
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
          <Row gutter={16} style={{'marginBottom': '10px'}}>
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
          <Row gutter={16} style={{'marginBottom': '10px'}}>
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