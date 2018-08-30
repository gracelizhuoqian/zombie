import Reg from '../components/backEnd/Reg'
import Login from '../components/backEnd/Login'
import Admin from '../components/backEnd/Admin'
import ArticleDetail from '../components/backEnd/ArticleDetail'
import ArticleList from '../components/backEnd/ArticleList'
import ClassList from '../components/backEnd/ClassList'
import EssayDetail from '../components/backEnd/EssayDetail'
import EssayList from '../components/backEnd/EssayList'
import Home from '../components/frontEnd/Home'
import Front from '../components/frontEnd/Front'
import About from '../components/frontEnd/About'
import Life from '../components/frontEnd/life'
import Articles from '../components/frontEnd/Articles'
import Article from '../components/frontEnd/Article'
import NotFound from '../components/NotFound'

export default [
  {
    path: '/',
    component: Front,
    hidden: true,// tips 增加hidden 在侧边栏里面隐藏不需要的部分
    children: [
      {path: '', redirect: 'home', meta: {auth: false}},
      {path: 'home', component: Home, meta: {auth: false}},
      {path: 'about', component: About, meta: {auth: false}},
      {path: 'life', component: Life, meta: {auth: false}},
      {path: 'articles', component: Articles, meta: {auth: false}},
      {path: 'article/:id', component: Article, meta: {auth: false, scrollToTop: true}},
    ]
  },
  {
    path: '/reg',
    component: Reg,
    meta: {auth: false}, // tips meta表示是否需要验证，只能实现路由级别的控制
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    // 后台路由
    path: '/admin',
    component: Admin,
    iconCls: 'el-icon-message',
    children: [
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: '', hidden: true, redirect: {name: '文章管理'}
      },
      {
        // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
        path: 'articleList', component: ArticleList, name: '文章管理'
      },
      {
        // 创建文章单独一个组件
        path: 'articleCreate', component: ArticleDetail, name: '创建文章', hidden: true
      },
      {
        path: 'articleEdit/:postId', component: ArticleDetail, hidden: true, name: "编辑文章"
      },
      {
        path: 'classList', component: ClassList, name: '分类管理'
        // 创建分类直接在分类列表里面出现弹层
      },
      {
        path: 'essayList', component: EssayList, name: '随笔管理'
      },
      {
        path: 'essayCreate', component: EssayDetail, name: '创建随笔', hidden: true
      },
      {
        path: 'essayEdit/:postId', component: EssayDetail, hidden: true, name: '编辑随笔'
      }
    ]
  },
  {
    path: '*', component: NotFound, hidden: true
  }
  // tips 404 页面一定要最后加载，如果先声明了404，后面的页面都会被拦截到404
]
