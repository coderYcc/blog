import React, { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config';
import routes from './router';
import { BrowserRouter } from 'react-router-dom';
import { prepareRoutes } from './utils/route-loader';

const App = memo(() => {
  const preparedRoutes = prepareRoutes(routes);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {renderRoutes(preparedRoutes)}
      </Suspense>
    </BrowserRouter>
  )
})

export default App