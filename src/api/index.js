import axios from 'axios'
import store from '../store'
import router from '../router'
const instance = axios.create();//供后端使用
const front_instance = axios.create();//供前台使用
instance.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// tips 1. 用于设定请求头 content-type 2.注入token，验证token的有效性

if(store.state.token){
  /* localStorage.getItem('jwt')是带引号的字符串
    Bearer token(通过Authorization头部字段发送到服务端便于验证)的格式：Bearer XXXXXXXXXX
  */
  instance.defaults.headers.common['Authorization'] = `token ${store.state.token}`;
}
// 注入token
// tips 拦截器统一处理需要获取权限登录的地方的响应
// instance.interceptors.response.use(
//   response => {
//     if(response.data.code ==401){
//       // 只有在当前路由不是登录页面才跳转
//       router.currentRoute.path !== 'login' &&
//       router.replace({
//         path: 'login',
//         query: { redirect: router.currentRoute.path },
//       })
//     }
//     return response
//   },
//   error => {
//     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//     return Promise.reject(error.response.data)
//   },
// )

export default {
  // 注册
  localReg(data){
    return axios.post('/api/reg',data)
  },
  // 登录
  localLogin(data){
    return axios.post('/api/login',data)
  },
  //获取文章列表{带分页获取}
  getArticleList(data){
    return instance.post('/api/article/lists',data);
  },
  // 带分页文章列表
  getArticleLists(params){
    return front_instance.post('/api/article/articleLists',params);
  },
  // 根据classify获取文章列表
  getArticlesByClassify(params){
    return front_instance.post('/api/article/noAuthArtilcelists',params);
  },
  // 创建文章
  createArticle(params){
    return instance.post('/api/article/create',params);
  },
// 删除一篇文章
  removeOneArticle(params){
    return instance.post('/api/article/remove',params);
  },
// 根据postID获取一篇文章(带权限)
  getOneArticle(params){
    return instance.post('/api/article/onePage',params);
  },
// 根据postID获取一篇文章(不带权限)
  getOneArticleNoAuth(params){
    return front_instance.post('/api/article/noAuth',params);
  },
// 编辑一篇文章
  editArticle(params){
    return instance.post('/api/article/edit',params);
  },
  // 获取文章标题
  getArticleTitles(){
    return front_instance.get('/api/article/titles');
  },
  // 根据标题返回文章
  getArticleByTitle(param){
    return front_instance.post('/api/article/noAuByTitle',param);
  },
  // 获取分类列表
  getClassify(){
    return instance.get('/api/classify/lists');
  },
  getNoAuthClass(){
    return front_instance.get('/api/classify/noAuth');
  },

  // 删除某一个分类
  removeClassifyList(params){
    return instance.post('/api/classify/remove',params);
  },
  // 添加分类
  addClassify(params){
    return instance.post('/api/classify/create',params);
  },

  // 编辑分类
  editClassfy(params){
    return instance.post('/api/classify/edit',params);
  },
  // 创建一篇随笔
  createEssay(params){
    return instance.post('/api/essay/create',params);
  } ,
  //获取所有随笔列表，后台
  getEssayListBack(params){
    return instance.post('/api/essay/lists',params);
  },
  //根据分类获取随笔内容，前台
  getEssayPart(params){
    return front_instance.post('/api/essay/part',params);
  },
  //获取某篇随笔内容，后台
  getOneEssay(param){
    return instance.post('/api/essay/detail',param);
  },
  //删除一篇随笔
  removeEssay(param){
    return instance.post('/api/essay/remove',param);
  },
  //更新一篇随笔
  updateEssay(params){
    return instance.post('/api/essay/edit',params);
  },
  // 获取一篇文章的评论
  getComment(params){
    return instance.post('/api/comment/lists',params);
  },
  // 创建评论
  createComment(param){
    return front_instance.post('/api/comment/create',param);
  },
  // 删除评论
  removeComment(param){
    return instance.post('/api/comment/remove',param);
  }
}
