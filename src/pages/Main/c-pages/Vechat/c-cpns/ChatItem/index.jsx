import React, { memo, useState, useEffect } from 'react'
import { ChatItemWrapper } from './style'
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { marked } from 'marked';
import hljs from "highlight.js";

const ChatItem = memo((props) => {
  const { content, role } = props.info || {}
  const [info, setInfo] = useState(content)
  const robot = () => (
    <svg t="1742206977631" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1279"><path d="M511.900156 0.199961c282.744776 0 511.90002 229.155243 511.90002 511.900019s-229.155243 511.90002-511.90002 511.90002S0.000137 794.844757 0.000137 512.09998 229.25536 0.199961 511.900156 0.199961z" fill="#3E5BF2" p-id="1280"></path><path d="M465.209276 790.245655L224.756239 272.246827c-23.895333-50.990041-27.794571-62.787737 40.09217-62.787737H294.642589c24.895138 0 33.493458 10.397969 40.492092 26.594806L499.002675 568.888889c20.795938 42.491701 73.685608 61.28803 107.179067-4.999024l161.268502-328.435852c12.197618-27.894552 14.397188-27.194689 37.892599-27.194689 21.495802 0 1.799649 34.993165-12.197617 64.387425l-247.951572 517.998828c-16.096856 33.7934-64.187463 33.493458-79.984378-0.399922z" fill="#FFFFFF" p-id="1281"></path></svg>
  )
  const user = () => (
    <svg t="1742351065674" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1332"><path d="M992 542c0 248.55-201.51 450-450 450h-60C233.48 992 32 790.55 32 542v-60C32 233.48 233.48 32 482 32h60c248.49 0 450 201.48 450 450v60z" fill="#e6e6e6" p-id="1333"></path><path d="M512.01909503 301.95474522a129.426067 129.426067 0 0 0-129.27330682 129.2733068 129.426067 129.426067 0 0 0 129.27330682 129.25421179c71.26262645 0 129.29240183-58.02977538 129.29240183-129.25421178A129.46425704 129.46425704 0 0 0 512.01909503 301.95474522z" fill="#8a8a8a" p-id="1334"></path><path d="M632.92342378 567.22432327c-33.39414597 26.4418602-75.01516342 42.80290603-120.90024949 42.80290603s-87.45975495-16.40739441-120.96977234-42.80290603c-63.42802048 40.3927803-107.5750351 111.30609512-113.646698 193.43576432 22.20096589 3.01265717 61.73629761 6.25705719 118.11933517 6.25705718h232.87839889c56.42938613 0 95.96471787-3.24440003 118.21203233-6.28023147-6.02531433-82.15284348-50.19550324-153.01980972-113.69304657-193.41259003z" fill="#8a8a8a" p-id="1335"></path></svg>
  )
  const RobotIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={robot} {...props} />
  );
  const UserIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={user} {...props} />
  );
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
  useEffect(() => {
    setInfo(marked(content))
  }, [content])
  return (
    <ChatItemWrapper>
      { 
        role === 'assistant' &&
        <div className="content-left">
          <RobotIcon />
        </div>
      }
      <div className={`content-info ${role === `user` ? `user-info` : ``}`}>
        <div className="content-text" dangerouslySetInnerHTML={{ __html: info }}>
        </div>
      </div>
      {
        role === 'user' &&
        <div className="content-right">
          <UserIcon />
        </div>
      }
      
    </ChatItemWrapper>
  )
})

export default ChatItem