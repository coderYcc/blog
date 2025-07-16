// utils/route-loader.js
import { useAuth } from '../hooks/useAuth';
import { Redirect, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

const withAuthCheck = (Component) => (props) => {
  const { isAuthenticated  } = useAuth();
  const location = useLocation();
  if (!isAuthenticated ) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    );
  }

  return <Component {...props} />;
};

export const loadRoute = (route) => {
  if (route.auth) {
    const AuthenticatedComponent = withAuthCheck(route.component);
    return (props) => <AuthenticatedComponent {...props} />;
  }
  return (props) => <route.component {...props} />;
};

export const prepareRoutes = (routes) => {
  return routes.map((route) => ({
    ...route,
    component: loadRoute(route)
  }));
};