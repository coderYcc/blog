import React, { memo } from 'react'

import { renderRoutes } from 'react-router-config';

import routes from './router';


import { HashRouter } from 'react-router-dom';

const App = memo(() => {
  return (
    <HashRouter>
      {renderRoutes(routes)}
    </HashRouter>
  )
})

export default App