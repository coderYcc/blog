import React, { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config';
import routes from './router';
import { BrowserRouter } from 'react-router-dom';
import { prepareRoutes } from './utils/route-loader';
import CircleLoader from './components/loader'
const App = memo(() => {
  const preparedRoutes = prepareRoutes(routes);
  return (
    <BrowserRouter>
      <Suspense fallback={
        <CircleLoader 
          size="32px" 
          primaryColor="#28a745"
          text="页面数据加载中..." 
          height="calc(100vh - 120px)" 
        />
      }>
        {renderRoutes(preparedRoutes)}
      </Suspense>
    </BrowserRouter>
  )
})

export default App