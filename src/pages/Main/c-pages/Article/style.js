import styled from "styled-components";
export const ArticleWrapper = styled.div`
  width: 75%;
  margin: 10px auto 0;
  display: flex;
  .article-content {
    flex: 4;
    border: 1px solid #eee;
    padding: 10px;
    .article-title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    .article-time {
      text-align: center;
    }
    .article-img {
      width: 100%;
      height: auto;
    }
    .article-desc {
      margin-top: 10px;
      .desc-title {
        font-size: 20px;
        font-weight: bold;
        color: #0ff;
        text-align: center;
      }
      .desc-content {
        margin-top: 10px;
      }
    }
    .article-body {
      margin-top: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #0ff;
      text-align: center;
    }
  }
  .article-log {
    flex: 1;
    margin-left: 10px;
    border: 1px solid #eee;
  }
  .markdown-content {
    margin-top: 15px;
  }
  /* markdown样式 */
  h1 {
    font-size:30px;
  }

  h2 {
    font-size:28px;
  }
  h3 {
    font-size:24px;
  }
  h4 {
    font-size:20px;
  }
  pre {
    display: block;
    background-color: #283646 !important;
    padding: .5rem !important;
    overflow-y: auto;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: .3rem;
  }
  
  pre > code{
    border:0px !important;
    background-color: #283646 !important;
    color:#FFF;
  }
  code {
    display: inline-block ;
    background-color:#f3f3f3;
    border:1px solid #fdb9cc;
    border-radius:3px;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    color:#4f4f4f;
    margin: 0px 3px;
  
  }
  blockquote p{
    margin: 0;
  }

  p {
    margin: 10px 0;
  }

  ul {
    padding: 0 20px;
    li {
      list-style: circle;
      li {
        list-style: disc;
        li {
          list-style: square;
        }
      }
    }
  }

  table {
    tr, td, th {
      padding: 0 5px;
      border: 1px solid;
    }
  }
`