import React, { lazy } from 'react';
import { Redirect } from "react-router-dom";

import Main from '../pages/Main'
import Home from '../pages/Main/c-pages/Home'
const Login = lazy(() => import('../pages/Login'))
const Edit = lazy(() => import('../pages/Edit'))
const Project = lazy(() => import('../pages/Main/c-pages/Project'))
const Article = lazy(() => import('../pages/Main/c-pages/Article'))
const Vechat = lazy(() => import('../pages/Main/c-pages/Vechat'))
const Admin = lazy(() => import('../pages/Admin'))
const AddArticle = lazy(() => import('../pages/Admin/c-pages/AddArticle'))
const UploadFile = lazy(() => import('../pages/Admin/c-pages/UploadFile'))
const FileList = lazy(() => import('../pages/Admin/c-pages/FileList'))
const routes = [
  {
    path:'/',
    exact: true,
    render: () => (
      <Redirect to="/main"/>
    )
  },
  {
    path:'/main',
    component: Main,
    routes: [
      {
        path: '/main',
        exact: true,
        render: () => (
          <Redirect to="/main/home"/>
        )
      },
      {
        path:'/main/home',
        component: Home
      },
      {
        path:'/main/project',
        component: Project
      },
      {
        path:'/main/article',
        component: Article
      },
      {
        path:'/main/vechat',
        component: Vechat
      },
    ]
  },
  {
    path:'/admin',
    component: Admin,
    routes: [
      {
        path: '/admin',
        exact: true,
        render: () => {
          <Redirect to="/admin/add-article"/>
        }
      },
      {
        path: '/admin/add-article',
        component: AddArticle
      },
      {
        path: '/admin/upload-file',
        component: UploadFile
      },
      {
        path: '/admin/file-list',
        component: FileList
      },
    ]
  },
  {
    path:'/edit',
    component: Edit,
  },
  {
    path:'/login',
    component: Login,
  }
]

export default routes