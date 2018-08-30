const cookieStorage=function(path,age){
  let cookie=document.cookie?formatCookie(document.cookie):{};
  this.getItem=function(key){
    return cookie[key]||null;
  };
  this.setItem=function(key,value){
    if(cookie){
      cookie[key]=value;
    }
    let temp=key + '=' + encodeURIComponent( value );
    if(path){
      temp+=';path=' + path;
    }
    if(age){
      temp+=';max-age='+age;
    }
    document.cookie=temp;
  };
  this.removeItem=function(key){
    if(cookie[key]){
      delete cookie[key];
      document.cookie=key+'=;mag-age=0'
    }
  }
  this.clear=function(){
    let temp='';
    cookie.keys().forEach((item)=>{
      temp+=item+'=;';
    })
    temp+='max-age=0';
    document.cookie=temp;
  }
}
function formatCookie(cookie){
  let items=cookie.split(';');
  let res={};
  items.forEach((item)=>{
    let key=item.split('=')[0];
    let value=item.split('=')[1];
    value = decodeURIComponent( value );
    // 注意解码
    res[key]=value;
  });
  return res;
}
const storage=window.localStorage||new cookieStorage();
export default storage;
// tips localstorage/cookie兼容
