import styled from 'styled-components'

export const HomeWrapper = styled.div`
  width: 100%; /* 先占满手机屏幕 */
  max-width: 1200px; /* 最大宽度限制 */
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column; /* 手机上垂直排列 */

  .article-list {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    order: 1; /* 内容优先 */
  }

  .article-log {
    flex: 1;
    margin-top: 20px; /* 手机上顶部间距 */
    margin-left: 0; /* 取消左侧 margin */
    padding: 15px;
    border: 1px solid #ddd;
    height: 300px; /* 小屏高度适当减小 */
    order: 2; /* 日志放在内容下方 */
    display: none;
  }

  /* ----------- 平板及以上 (768px) ----------- */
  @media (min-width: 768px) {
    flex-direction: row; /* 恢复左右布局 */
    padding: 15px;

    .article-list {
      flex: 3;
      padding: 15px;
    }

    .article-log {
      flex: 1;
      margin-top: 0;
      margin-left: 15px;
      height: 400px;
      order: 1; /* 恢复顺序 */
      display: none;
    }
  }

  /* ----------- 桌面端 (1024px) ----------- */
  @media (min-width: 1024px) {
    width: 75%;
    max-width: 1400px;

    .article-list {
      flex: 4;
      padding: 20px;
    }

    .article-log {
      height: 450px;
      padding: 20px;
      display: block;
      position: sticky;
      top: 0;
    }
  }
`