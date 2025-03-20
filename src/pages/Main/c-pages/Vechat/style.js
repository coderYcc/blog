import styled from "styled-components";
export const VechatWrapper = styled.div`
  width: 70%;
  height: calc(100% - 85px);
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .chat-container {
    padding: 20px 0;
    width: 100%;
    max-width: 780px;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 auto;
  }
  .chat-input {
    height: 20%;
    max-width: 780px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    padding: 10px 0;
    position: sticky;
    bottom: 30px;
    margin: 0 auto;
    .chat-button {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: flex-end;
      .chat-submit {
        margin-right: 20px ;
        font-size: 24px;
        color: #ddd;
      }
    }
  }
  .chat-notice {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #dddddd;
    text-align: center;
    position: static;
    bottom: 0;
    margin: 0 auto;
  }
`