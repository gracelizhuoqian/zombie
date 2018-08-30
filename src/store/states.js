import storage from '../assets/js/cookieStorage'

export default {
  // token:isLoggedIn()||null
  get token() {
    return isLoggedIn() || null
  }
}

// tips 能够动态检测是否有token，防止删除或失效后时候还继续使用，个人认为只能验证是否有token和解析出来时间没失效但是不能验证本身的正确性
function isLoggedIn() {
  let token = storage.getItem('jwt');
  if (token) {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    if (payload.exp > new Date() / 1000) {
      return token;
    } else {

    }
  }
  return false;
}

// 需要登录的时候取出token并判断是否过期
