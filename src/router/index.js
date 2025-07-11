import React from 'react';
import { Redirect } from "react-router-dom";

import Main from '../pages/Main'
import Home from '../pages/Main/c-pages/Home'
import Edit from '../pages/Edit'
import Login from '../pages/Login'
import Project from '../pages/Main/c-pages/Project'
import Article from '../pages/Main/c-pages/Article'
import Vechat from '../pages/Main/c-pages/Vechat'
import Admin from '../pages/Admin'
import AddArticle from '../pages/Admin/c-pages/AddArticle'
import UploadFile from '../pages/Admin/c-pages/UploadFile'
import FileList from '../pages/Admin/c-pages/FileList'

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
    auth: true,
    routes: [
      {
        path: '/admin',
        exact: true,
        auth: true,
        render: () => {
          <Redirect to="/admin/add-article"/>
        }
      },
      {
        path: '/admin/add-article',
        auth: true,
        component: AddArticle
      },
      {
        path: '/admin/upload-file',
        auth: true,
        component: UploadFile
      },
      {
        path: '/admin/file-list',
        auth: true,
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