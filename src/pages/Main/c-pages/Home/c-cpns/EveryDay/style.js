import styled from 'styled-components'
export const EveryDayWrapper = styled.div`
  .day-title {
    text-align: center;
  }
  .day-calendar {
    border: 1px solid #eee;
    padding: 5px;
    .change-card {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
      }
      .color-weight {
        font-weight: 700;
        margin: 0 2px;
      }
      .card-title {
        padding:0 12px ;
      }
    }
    .calendar-week {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
    }
    .calendar-date {
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .date-item {
        width: 14%;
        height: 24px;
        .date-text {
          display: inline-block;
          width: 24px;
          text-align: center;
          line-height: 24px;
        }
      }

      .date-check {
        background-color: #1677ff;
        border-radius: 5px;
      }
      
    }
  }
`