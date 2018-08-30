import {USER_LOGIN,USER_LOGOUT,USER_REG} from "./types";
import storage from '../assets/js/cookieStorage';
export default {
  [USER_REG](state,token){
    storage.setItem('jwt',token);
    state.token=token;
  },
  [USER_LOGIN](state,token){
    storage.setItem('jwt',token);
    state.token=token;
  },
  [USER_LOGOUT](state){
    storage.removeItem('jwt');
    state.token=null;
  }
}
