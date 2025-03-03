import styled from "styled-components";
export const VechatWrapper = styled.div`
  width: 70%;
  height: calc(100% - 135px);
  margin: 0 auto;
  position: relative;
  .chat-container {
    height: 60%;
  }
  .chat-input {
    height: 30%;
    position: absolute;
    bottom: 0;
  }
`