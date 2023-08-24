import styled from 'styled-components'
export const BasicEditerWrapper = styled.div`
  padding: 20px;
  .toolbar {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid #aaa;
    /* background-color: rgb(240,240,240); */
    width: 100%;
    div {
      padding: 10px;
      width: 30px;
      font-weight: bold;
      background-color: #fff;
    }
  }

  span .italic {
    font-style: italic;
  }
  pre {
    width: 100%;
    background-color: #e0e0e0;
    opacity: 0.8;
    margin-bottom: 0 !important;
    padding: 2px 10px;
  }


  .size {
    font-size: 16px;
  }

  .font-size-1 {
    font-size: 12px;
  }

  .font-size-2 {
    font-size: 16px;
  }

  .font-size-3 {
    font-size: 20px;
  }

  .font-size-4 {
    font-size: 24px;
  }

  .font-size-5 {
    font-size: 32px;
  }

  .font-size-6 {
    font-size: 48px;
  }

  .font-size-7 {
    font-size: 64px;
  }

  @font-face {
    font-family: 'iconfont';
    src: url('iconfont.ttf?t=1684894650973') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
