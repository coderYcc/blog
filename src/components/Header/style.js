import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  height: 55px;
  color: #fff;
  background-color: #24292f;

  .content {
    height: 55px;
    display: flex;
    justify-content: space-between;
    line-height: 55px;

    /* 移动端优先：默认样式适合小屏幕 */
    .title {
      flex: 1;
      text-align: center;
      font-weight: bold;
      font-size: 18px; /* 小屏稍小一点 */
    }

    .select-list {
      flex: 2; /* 菜单占更少空间 */
      display: flex;
      justify-content: center;

      .select-item {
        padding: 0 12px; /* 减小 padding */
        a {
          color: #ffffff;
          text-decoration: none;
          font-size: 14px; /* 移动端字体适中 */
        }
      }
    }
  }

  /* 平板及以上设备（768px ~ 1023px） */
  @media (min-width: 768px) {
    .content {
      .title {
        font-size: 20px;
      }
      .select-list {
        flex: 3;
        .select-item {
          padding: 0 20px;
          a {
            font-size: 16px;
          }
        }
      }
    }
  }

  /* 桌面端（1024px 及以上） */
  @media (min-width: 1024px) {
    .content {
      width: 1200px;
      margin: 0 auto; /* 居中内容 */

      .title {
        flex: 2;
        font-size: 20px;
      }

      .select-list {
        flex: 5;
        .select-item {
          padding: 0 30px;
          a {
            font-size: 16px;
          }
        }
      }
    }
  }
`