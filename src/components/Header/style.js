import styled from 'styled-components'
export const HeaderWrapper = styled.div`
    height: 55px;
    color: #fff;
    background-color: #24292F;
    .content {
      height: 55px;
      display: flex;
      justify-content: space-between;
      line-height: 55px;

      .title {
        flex: 2;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
      }

      .select-list {
        flex: 5;
        display: flex;
        justify-content: center;
        .select-item {
          padding: 0 30px;
          a {
            color: #FFFFFF;
            text-decoration: none;
          }
        }
      }
    }
`