export const headerLinks = [
  {
    title: "首页",
    link: "/main/home"
  },
  {
    title: "实战",
    link: "/main/project"
  },
  {
    title: "聊天AI",
    link: "/main/vechat"
  },
]

export const menuLinks = [
  {
    title: "文章管理",
    link: "/admin/article",
    icon: 'MailOutlined',
    children: [
      {
        title: '文章列表',
        link: "/admin/article-list"
      },
      {
        title: '增加文章',
        link: "/admin/add-article"
      },
      {
        title: '暂存文章',
        link: "/admin/hold-article"
      }
    ]
  },
  {
    title: "评论管理",
    icon: 'ProfileOutlined',
    link: "/admin/review",
  },
  {
    title: "资源管理",
    icon: 'FireOutlined',
    link: "/admin/resource",
    children: [
      {
        title: '文件上传',
        link: "/admin/upload-file"
      },
      {
        title: '文件列表',
        link: "/admin/file-list"
      },
    ]
  },
]