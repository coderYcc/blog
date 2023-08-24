import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Main = memo((props) => {
  const { route } = props
  return (
    <>
      <Header/>
      {renderRoutes(route.routes)}
      <Footer/>
    </>
  )
})

export default Main