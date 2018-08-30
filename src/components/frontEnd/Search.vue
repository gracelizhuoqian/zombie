<template>
  <div class="searchbar" :class="{ onfocus: show }">
    <input type="text" v-model="searchContent" @keyup="searchFn" ref="search" @blur="show=false"><span
    class="searchicon"><img src="../../assets/img/search.png" @click="showSearch"></span>
    <ul class="searchpanel" @click="searchFind">
      <li v-for="(item,index) in options" :data-index="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  import api from '../../api/index'
  import {throttle} from "../../assets/js/debounce"

  export default {
    name: "Search",
    data() {
      return {
        searchContent: '',
        show: false,
        searchCache:[],
        options:[],
        throttleTemp:null,
      }
    },
    methods: {
      showSearch:function(){
        this.show=true;
        setTimeout(()=>{
          this.$refs.search.focus();
        },100);
        // tips 自动聚焦
      },
      searchFun:function(e){
        let val=e.target.value;
        this.options=[];
        if(val){
          this.searchCache.forEach(function(item){
            let pattern=new RegExp(val,'g');
            if(pattern.test(item.title)){
              this.options.push(item);
            }
          }.bind(this))
          // tips 需要绑定this避免丢失，方式用户在输入过程中修改，每次都需要清空查询
        }
      },
      searchFn:function(e){
        return this.throttleTemp(e);
      },
      searchFind:function(e){
        let index=e.target.dataset.index;
        // tips 绑定li的自定义属性实现事件代理
        let id=this.options[index]._id;
        this.$router.push({path:`/article/${id}`});
        this.show=false;
        this.options=[];
        this.searchContent='';
      }
    },
    mounted(){
      api.getArticleTitles().then(({data})=>{
        if(data && data.code===200){
          this.searchCache=data.titles;
        }
      }).catch(e=>{
        console.log(e);
      })
      this.throttleTemp=throttle(this.searchFun,1000);
      // tips 节流成功处理，绑定临时变量并且只执行一次
    },
  }
</script>

<style scoped>
  .searchbar {
    flex: 1;
    height: 75%;
    text-align: left;
    align-self: center;
    padding-left: 50px;
  }

  .searchicon img {
    width: 54px;
    opacity: 0.7;
    margin-left: -54px;
  }


  .searchbar input {
    width: 0px;
    height: 50px;
    vertical-align: top;
    line-height: 50px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0);
    font-size: 25px;
    padding-left: 10px;
    -webkit-animation: width 2s ease-in-out;
    -o-animation: width 2s ease-in-out;
    animation: width 2s ease-in-out;
  }

  .searchbar input:focus{
    border: none;
    outline:none;
  }
  /*tips 通过设置outline来取消默认focus样式*/
  .onfocus input {
    width: 300px;
    margin-left: -54px;
    background: rgba(255, 255, 255, 0.5);
  }
  .searchpanel{
    width: 290px;
    color: #000;
    background: rgba(255, 255, 255, 0.8);
    list-style: none;
    padding-left: 0;
    position: absolute;
    left: 2.5%;
    top: 44px;
  }
  li{
    border-bottom: 1px solid #eeeeee;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.8;
    padding-left: 1rem;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) and (min-width: 480px) {
    .searchicon img {
      width: 40px;
    }
  }

  @media screen and (max-width: 480px) {
    .searchicon img {
      width: 30px;
    }
  }
</style>
