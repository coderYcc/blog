import React, { memo } from 'react'

import { renderRoutes } from 'react-router-config';

import routes from './router';


import { BrowserRouter } from 'react-router-dom';

const App = memo(() => {
  return (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  )
})

export default App