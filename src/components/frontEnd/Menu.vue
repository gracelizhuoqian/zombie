<template>
  <div class="mymenu" v-if="isShow">
    <div class="menu" @click="closemenu" v-bind:class="{on:isShow}">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
    </div>
    <ul @click="closemenu">
      <li><router-link to="/home">HOME</router-link></li>
      <li><router-link to="/articles">ARTICLE</router-link></li>
      <li><router-link to="/life">LIFE</router-link></li>
      <li><router-link to="/about">ABOUT</router-link></li>
      <li><router-link to="/admin">LOGIN</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:{
      isShow:{
        type:Boolean,
      }
    },
    data:function(){
      return {
        onMenu:false
      }
    },
    methods:{
      closemenu:function() {
        this.$emit("on-close");
      }
    }
  }
</script>

<style>
  .menu{
    position: absolute;
    width: 30px;
    height: 30px;
    top: 20px;
    right: 35px;
  }
  .one,.two,.three{
    width: 100%;
    height: 5px;
    margin: 5px auto;
    background: #3d3d3d;
    border-radius: 2px;
    transition-delay: 2s;
  }
  .on .one{
    transform: rotate(45deg) translate(5px, 5px);
  }
  .on .two{
    opacity: 0;
  }
  .on .three{
    transform: rotate(-45deg)translate(8px, -10px);
  }
  .mymenu {
    z-index: 10;
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba(80, 80, 80, 0.8);
    position: fixed;
    top: 0;
    right: 0;
  }
  .mymenu ul{
    clear: both;
    margin: 0;
    padding: 0;
    list-style: none;
    margin: 10em auto;
    text-align: center;
  }
  .mymenu ul li{
    display: block;
  }
  .mymenu ul a{
    color: rgba(202, 221, 191, 0.63);
    font-size: 1.7em;
    line-height: 2;
    width: 100%;
    display: block;
  }
  .mymenu ul li:hover{
    background: #3d3d3d;
  }
  @media screen and (max-width: 768px) and (min-width: 480px){
    .menu{
      width: 25px;
      height: 25px;
      top: 15px;
      right: 25px;
    }
    .one,.two,.three{
      width: 100%;
      height: 4px;
      margin: 5px auto;
      background: #3d3d3d;
      border-radius: 2px;
      transition-duration: 2s;
    }
    .on .one{
      transform: rotate(45deg) translate(4px, 4px);
    }
    .mymenu ul a{
      font-size: 1.7rem;
    }
  }
  @media screen and (max-width: 480px){
    .menu{
      width: 20px;
      height: 20px;
      top: 8px;
      right: 20px;
    }
    .one,.two,.three{
      height: 3px;
      margin: 4px auto;
    }
    .on .one{
      transform: rotate(45deg) translate(3px, 3px);
    }
    .on .three{
      transform: rotate(-45deg)translate(6px, -8px);
    }
    .mymenu ul a{
      font-size: 1.5rem;
    }
  }
</style>
