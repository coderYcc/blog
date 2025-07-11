import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from './router';
import { prepareRoutes } from './utils/route-loader';

const App = memo(() => {
  const preparedRoutes = prepareRoutes(routes);
  return (
    <BrowserRouter>
      {renderRoutes(preparedRoutes)}
    </BrowserRouter>
  )
})

export default App