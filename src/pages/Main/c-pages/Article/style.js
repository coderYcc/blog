import styled from "styled-components"

export const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 10px auto 0;
  padding: 0 15px; /* 适配手机左右边距 */
  display: flex;
  flex-direction: column; /* 手机默认垂直布局 */

  .article-content {
    flex: 1;
    border: 1px solid #eee;
    padding: 15px;
    order: 1; /* 内容优先显示 */
  }

  .article-log {
    flex: 1;
    margin-top: 20px; /* 手机上顶部间距 */
    margin-left: 0;
    border: 1px solid #eee;
    order: 2; /* 目录放在后面 */
  }

  /* ----------- 平板及以上 (768px) ----------- */
  @media (min-width: 768px) {
    flex-direction: row; /* 恢复左右布局 */

    .article-content {
      flex: 3;
      max-width: 70%;
      padding: 20px;
    }

    .article-log {
      flex: 1;
      max-width: 30%;
      margin-top: 0;
      margin-left: 15px;
      position: sticky; /* 目录可滚动定位 */
      top: 0px; /* 距离顶部一定距离后固定 */
      align-self: start; /* 防止拉伸 */
    }
  }

  /* ----------- 桌面端 (1024px) ----------- */
  @media (min-width: 1024px) {
    .article-content {
      max-width: 75%;
      padding: 25px;
    }

    .article-log {
      max-width: 25%;
    }
  }

  /* =========== 文章内容样式 =========== */
  .article-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .article-time {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .article-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 15px 0;
  }

  .article-desc {
    margin-top: 15px;
    .desc-title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      text-align: center;
    }
    .desc-content {
      margin-top: 10px;
      font-size: 15px;
      line-height: 1.6;
    }
  }

  .article-body {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }

  .markdown-content {
    margin-top: 15px;
    line-height: 1.8;
  }

  /* ========== Markdown 样式 ========== */
  h1 { font-size: 26px; }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }
  h4 { font-size: 18px; }
  h5 { font-size: 16px; }
  h6 { font-size: 14px; }

  /* 代码块：确保可横向滚动 */
  pre {
    display: block;
    background-color: #283646 !important;
    padding: 0.5rem;
    overflow-x: auto; /* 横向滚动 */
    white-space: pre;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: 0.3rem;
    margin: 10px 0;
  }

  pre > code {
    border: 0 !important;
    background-color: #283646 !important;
    color: #fff;
  }

  code {
    display: inline-block;
    background-color: #f3f3f3;
    border: 1px solid #fdb9cc;
    border-radius: 3px;
    font-size: 14px;
    padding: 2px 5px;
    color: #4f4f4f;
    margin: 0 3px;
  }

  blockquote {
    border-left: 4px solid #d0d7de;
    margin: 15px 0;
    padding: 0 15px;
    color: #555;
    background-color: #f8f9fa;
  }

  p {
    margin: 12px 0;
    font-size: 16px;
    line-height: 1.7;
  }

  ul, ol {
    padding: 0 20px;
    margin: 12px 0;
  }

  li > ul, li > ol {
    margin: 8px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    overflow: scroll;
    display: block; /* 防止表格溢出 */
    white-space: wrap;
  }

  table th,
  table td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  /* 图片：响应式 */
  img {
    max-width: 100%; /* ✅ 关键：适配所有设备 */
    height: auto;
    border-radius: 8px;
    margin: 10px 0;
  }
`

export const CatalogButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  background: #24292f;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 998;

  &:hover {
    background: #000;
  }

  @media screen and (min-width: 480px) {
    right: 60px;
  }

  @media (min-width: 768px) {
    display: none; /* 平板以上隐藏 */
  }
`