import React, { memo, Suspense } from 'react'

import { renderRoutes } from 'react-router-config';

import routes from './router';

import { BrowserRouter } from 'react-router-dom';

const App = memo(() => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </BrowserRouter>
  )
})

export default App