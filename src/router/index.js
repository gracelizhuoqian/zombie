import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'
import store from '../store'
Vue.use(Router)
const scrollBehavior =(to, from, savedPosition)=> {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
const router =  new Router({
  mode:'history',
  routes: Routes,
  scrollBehavior,
})
// tips 路由钩子 每次跳转前都需要进行判断
router.beforeEach(({meta,path},from,next)=>{
  let {auth=true}=meta// 默认需要验证 admin中都需要验证
  let isLogin = Boolean(store.state.token)

  /*
      访问不需要权限的设置meta:false
      注册也要设置成meta:false
  */
  if(auth&&!isLogin&&path!=='/login'){
    return next({path:'/login'})
  }
  // 如果登录了以后再访问reg和login则路由到Home
  if(isLogin&&(path=='/login'||path=='/reg')){
    store.commit('USER_LOGIN', store.state.token);
    return next({path:'/admin'});
  }
  // tips 未登录的情况下访问必须先登录，登录时候需要刷新数据不然会带着原先的token
  next();
})

export default router
