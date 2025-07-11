// utils/route-loader.js
import { useAuth } from '../hooks/useAuth';
import { Redirect, useLocation } from 'react-router-dom';
import React from 'react';

export const loadRoute = (route) => {
  if (route.auth) {
    const Component = route.component;
    return (props) => {
      const { userInfo } = useAuth();
      const location = useLocation();

      if (!userInfo) {
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
  }
  return route.component;
};

export const prepareRoutes = (routes) => {
  return routes.map(route => ({
    ...route,
    component: loadRoute(route)
  }));
};