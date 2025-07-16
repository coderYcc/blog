import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo, loading } = useAuth();

  if (loading) return <div>加载中...</div>;

  // 未登录用户重定向到登录页
  if (!userInfo) {
    return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />;
  }

  // 已登录用户渲染目标组件
  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;