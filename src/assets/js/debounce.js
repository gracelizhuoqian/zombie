export function debounce(fn, delay) {
  var timer;
  return function () {
    var context = this;
    var args=arguments;// 调用黑箱fn时传入的参数
    // 通过setTimeout方式调用会丢失函数的上下文，闭包函数的调用的方式是我们期待的对fn的调用方式，对外部来说fn是个黑箱子，
    // 我们调用它的方式需要在闭包内部保存下来

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){
      fn.apply(context,args);
    }, delay);
  }
}

export function throttle(fn,delay){
  var timer=null,
    firstFlag=true;
  return function(){
    var context = this;
    var args=arguments;
    if(firstFlag){
      fn.apply(context,args);
      return firstFlag=false;
    }
    if(timer){
      return false;
    }
    // 上个定时器函数还未执行，也就是时间还没到delay
    timer=setTimeout(function(){
      clearTimeout(timer);
      timer=null;
      fn.apply(context,args);
    },delay)
    // 时间到了就会执行并清空计时器
  }
}
