import {USER_LOGIN,USER_LOGOUT,USER_REG,SAVE_NAME,CLEAR_NAME} from "./types";
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
  },
  [SAVE_NAME](state,name){
    storage.setItem('name',name);
    state.name=name;
  },
  [CLEAR_NAME](state){
    storage.removeItem('name');
    state.name='';
  }
}
