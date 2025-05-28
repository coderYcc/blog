import React, { memo, useState, useRef } from 'react'
import { VechatWrapper } from './style'
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons'
import ChatItem from './c-cpns/ChatItem'
import '../../../../style/index.css'
// import { queryAnswerInfo } from '../../../../network/chat'
const { TextArea } = Input;
const chatInfo = {
  content: '我是Vitaminc，很高兴遇到你',
  role: 'assistant'
}
const Vechat = memo(() => {
  const [question, setQuestion] = useState('')
  const [chatList, setChatList] = useState([chatInfo])
  const scrollRef = useRef()
  const textAreaRef = useRef()
  const changeDescription = (e) => {
    const text = e.target?.value || ''
    setQuestion(text)
  }

  const handleSubmitQuestion = () => {
    if(question) {
      setChatList(prevChatList => [...prevChatList, {
        content: question,
        role: 'user'
      }]);
      fetchAnswerInfo()
      setQuestion('')
    }
  }

  const fetchAnswerInfo = () => {
    let answer = ''
    const client = new SparkSSEClient();
    // 中间异步添加了两次数据(todo后续优化)
    const curIndex = chatList.length + 1
    setChatList(prevChatList => [...prevChatList, {
      content: answer,
      role: 'assistant' 
    }]);
    const text = question
    setQuestion('')
    // 启动对话
    client.streamChat(text, (chunk, done) => {
      if (done) {
        console.log('对话结束');
      } else {
        answer += chunk;
        updateChatList(curIndex, answer)
      }
    }).catch(err => {
      console.error('发生错误:', err);
    });

    // 中断对话
    // document.getElementById('stopBtn').addEventListener('click', () => {
    //   client.abort();
    // });
  }

  const updateChatList = (index, newValue) => {
    setChatList(prevChatList => {
      // 使用map遍历数组，创建一个新的数组
      return prevChatList.map((item, idx) =>
        idx === index ? { ...item, content: newValue } : item
      );
    });
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  // 处理输入框内按下的按键
  const handleKeyDown = (event) => {
    if (event.code === 'Enter') {
      const textAreaElement = textAreaRef.current; // 获取原生DOM节点
      if (textAreaElement) {
        textAreaElement.focus();
      }
      handleSubmitQuestion()
    }
  };

  class SparkSSEClient {
    constructor() {
      this.controller = null;
      this.baseUrl = 'http://127.0.0.1:5100/chat/getAnswerInfo';
    }

    async streamChat(question, callback) {
      this.controller = new AbortController();
      
      try {
        const response = await fetch(`${this.baseUrl}`, {
          method: 'POST', // 更改请求方法为POST
          signal: this.controller.signal,
          headers: {   
            'Accept': 'text/event-stream',
            'Content-Type': 'application/json' // 设置请求头以指示请求体中的数据类型
          },
          body: JSON.stringify({
            question: question // 将问题作为请求体的一部分发送
          }) // 使用JSON.stringify来将JavaScript对象转换为JSON字符串
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partial = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          partial += chunk;

          // 处理可能的多条消息
          const parts = partial.split('\n\n');
          partial = parts.pop() || '';

          for (const part of parts) {
            if (part.startsWith('data: ')) {
              const jsonStr = part.replace('data: ', '');
              try {
                const data = JSON.parse(jsonStr);
                if (data.content === '[DONE]') {
                  callback('', true);
                } else {
                  callback(data.content, false);
                }
              } catch (err) {
                console.error('解析错误:', err);
              }
            }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      } finally {
        this.controller = null;
      }
    }

    abort() {
      if (this.controller) {
        this.controller.abort();
      }
    }
  }

  return (
    <VechatWrapper>
      <div className="chat-box" ref={scrollRef}>
        <div className="chat-container">
          {
            chatList.map((item, index) => {
              return (
                <ChatItem
                  key={index}
                  info={item}
                />
              )
            })
          }
        </div>
      </div>      
      <div className="chat-input">
        <TextArea 
          ref={textAreaRef}
          rows={4} 
          value={question}
          placeholder="输入你的问题，帮你深度解答"
          bordered={false}
          autoSize={{
            minRows: 2,
            maxRows: 2,
          }}
          onChange={changeDescription}
          onKeyDown={handleKeyDown}
          onPressEnter={(e) => e.preventDefault()}
        />
        <div className="chat-button">
          <SendOutlined className="chat-submit" onClick={() => handleSubmitQuestion()}/>
        </div>
      </div>
      <div className="chat-notice">内容由AI大模型生成，请仔细甄别</div>
    </VechatWrapper>
  )
})

export default Vechat