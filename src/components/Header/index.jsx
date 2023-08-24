import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import {
  HeaderWrapper
} from './style'
import { headerLinks } from '@/common/local-data'
const Header = memo(() => {
  return (
    <HeaderWrapper>
      <div className='content'>
        <div className='title'>VitaminC</div>
        <div className='select-list'>
            {
              headerLinks.map((item) => {
                return (
                  <div className='select-item' key={item.title}>
                    <NavLink to={item.link}>{item.title}</NavLink>
                  </div>
                )
              })
            }
        </div>
      </div>
    </HeaderWrapper>
  )
})

export default Header