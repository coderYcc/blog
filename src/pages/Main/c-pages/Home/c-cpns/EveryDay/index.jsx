import React, { useEffect, useState } from 'react'
import { getFormatDate, judegHour, sloarToLunar } from '../../../../../../utils'
import { EveryDayWrapper } from './style'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
export default function EveryDay() {
  const date = new Date()
  const hello = judegHour(date)
  const sloar = getFormatDate(date, "yyyy年MM月dd日")
  const lunar = sloarToLunar(date)
  const weekDay = [
    { label: '日', value: 0 },
    { label: '一', value: 1 },
    { label: '二', value: 2 },
    { label: '三', value: 3 },
    { label: '四', value: 4 },
    { label: '五', value: 5 },
    { label: '六', value: 6 },
  ];
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
  const [dayList, setDayList] = useState([])
  const [title, setTitle] = useState(getFormatDate(date, "yyyy年MM月"))
  const [showTime, setShowTime] = useState({})
  useEffect(() => {
    getDay(today)
    setShowTime(today)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description: 获取当前月份展示
   */
  const getDay = (time) => {
    const { month, year, day } = time
    let monthDay
    let firstday = new Date(year, month - 1, 1);
    let week = firstday.getDay();
    let list = []
    setTitle(`${year}年${month}月`)
    if(week !== 0) {
      for(let i = 0; i < week; i++) { // 留出空格
        list.push('');
      }
    }
    if(month !== 2) {
      if([ 4, 6, 9, 11 ].includes(month)) {
        monthDay = 30;
      }else {
        monthDay = 31
      }
    }else {
      if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        monthDay = 29
      }else {
        monthDay = 28
      }
    }
    for(let j = 1; j <= monthDay; j++) {
      let check = (j === day && year === today.year && month === today.month) ? true : false
      list.push({ label: j, check })
    }
    let lastday = new Date(year, month - 1, monthDay);
    let space = 6 - lastday.getDay();
    if(lastday === 7) {
      space = 6
    }
    if(space !== 0) {
      for(let k = 0; k < space; k++) { // 留出空格
        list.push('');
      }
    }
    setDayList(list)
  }

  /**
   * @description: 选择日期
   */
  const handleSelectDate = () => {
    
  }

  /**
   * @description: 切换日历卡片
   */
  const handleSelect = (type) => {
    let { month, year, day } = showTime
    switch (type) {
      case 'last-year':
        if(year > 0) {
          year = year - 1
        }
        break;
      case 'next-year':
        year = year + 1
        break;
      case 'last-month':
        if(month === 1) {
          year = year - 1
          month = 12
        }else {
          month = month - 1
        }
        break;
      case 'next-month':
        if(month < 12) {
          month = month + 1
        }else {
          month = 1
          year = year + 1
        }
        break;
      default:
        break;
    }
    setShowTime({ year, month, day })
    getDay({ year, month, day })
  }
  return (
    <EveryDayWrapper>
      <div className='day-title'>
        <div>{hello}</div>
        <div>今天是{sloar}</div>
        <div>农历{lunar}</div>
      </div>
      <div className="day-calendar">
        <div className='change-card'>
          <LeftOutlined onClick={() => handleSelect('last-year')} />
          <LeftOutlined onClick={() => handleSelect('last-month')} />
          {/* <div className="iconfont icon-fanhui1 color-weight" onClick={() => handleSelect('last-year')}></div>
          <div className="iconfont icon-fanhui1 color-weight" onClick={() => handleSelect('last-month')}></div> */}
          <div className='card-title'>{title}</div>
          <RightOutlined onClick={() => handleSelect('next-month')} />
          <RightOutlined onClick={() => handleSelect('next-year')} />
          {/* <div className="iconfont icon-fanhui2 color-weight" onClick={() => handleSelect('next-month')}></div>
          <div className="iconfont icon-fanhui2 color-weight" onClick={() => handleSelect('next-year')}></div> */}
        </div>
        <div className='calendar-week'>
          {
            weekDay.map((item) => {
              return (
                <li className="everyday" key={item.value}>
                  {item.label}
                </li>
              );
            })
          }
        </div>
        <div className='calendar-date'>
          {
            setDayList && dayList.map((item, index) => {
              return (
                <div className="date-item"  key={index} onClick={() => handleSelectDate()}>
                  <span className={`date-text ${item.check ? 'date-check' : '' }`}>{item.label}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </EveryDayWrapper>
  )
}
