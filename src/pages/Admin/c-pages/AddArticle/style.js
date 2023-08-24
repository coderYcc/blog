import styled from 'styled-components'
export const EditWrapper = styled.div`
  .markdown-content {
    height: 420px;
  }
  .article-desc {
    height: 80px;
  }
  .show-html{
    padding:10px;
    border:1px solid #ddd;
    border-radius: 5px;
    font-size:16px;
    height: 420px;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .show-html h1{
    font-size:30px;
  }

  .show-html h2{
    font-size:28px;
    border-bottom: 1px solid #cbcbcb;
  }
  .show-html h3{
    font-size:24px;
  }

  .show-html pre{
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
  }
  .show-html pre>code{
    color: #000;
    background-color: #f0f0f0;
  }
  .show-html code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px; 
    color: #ff502c; 
  }
  .show-html blockquote{
    border-left:4px solid #cbcbcb ;
    padding: 10px 10px 10px 30px; 
    background-color: #f8f8f8;
  }
  
  /* markdown样式 */
  pre{
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
`