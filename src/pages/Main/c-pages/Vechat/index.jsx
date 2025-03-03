import React, { memo } from 'react'
import { VechatWrapper } from './style'
const Vechat = memo(() => {
  return (
    <VechatWrapper>
      <div className="chat-container"></div>
      <div className="chat-input"></div>
    </VechatWrapper>
  )
})

export default Vechat