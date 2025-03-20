import styled from "styled-components";
export const ChatItemWrapper = styled.div`
  width: 100%;
  display: flex;
  .content-left {
    width: 32px;
    height: 32px;
    margin-top: 5px;
    .anticon {
      height: 100%;
      width: 100%;
    }
  }
  .content-info {
    width: calc(100% - 68px);
    padding: 10px 16px;
    border-radius: 12px;
    min-height: 46px;
    box-sizing: border-box;
    position: relative;
  }
  .user-info {
    display: flex;
    flex-direction: row-reverse;
  }
  .content-right {
    width: 36px;
    height: 36px;
    margin-top: 5px;
    .anticon {
      height: 100%;
      width: 100%;
    }
  }
`