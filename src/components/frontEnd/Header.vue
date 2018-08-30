<template lang="html">
  <div class="app-header" v-bind:class="{hidden:!showHeader}">
    <div class="header-inner">
      <search></search>
      <div class="menu" v-show="isShowMenu" @click="clickmenu">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
      </div>
    </div>
    <mymenu :isShow="!isShowMenu" v-on:on-close="closemenu"></mymenu>
  </div>
</template>

<script>
  import mymenu from './Menu'
  import search from './Search'
  import {debounce} from '../../assets/js/debounce'
  export default {
    data() {
      return {
        isShowMenu: true,
        showHeader: true,
        winInit: 0
      }
    },
    components: {mymenu,search},
    methods: {
      clickmenu: function () {
        this.isShowMenu = false;
      },
      closemenu: function () {
        this.isShowMenu = true;
      },
      scrollmenu: function () {
        let scrolled = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // 滚动距离页面顶部距离
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 可视区域高度
        let scrollHeight =  document.documentElement.scrollHeight||document.body.scrollHeight;
        // 滚动总高度
        if (scrolled > this.winInit) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
          this.$emit('touch-up');
        }
        if(scrolled+windowHeight>(scrollHeight-10)){
          this.$emit("touch-bottom");
        }
        this.winInit = scrolled;
      },
    },
    mounted: function () {
      window.addEventListener('scroll', debounce(this.scrollmenu, 100));
    }// tips vue中自定义监听滚动事件
  }
</script>

<style lang="css" scoped>
  .app-header {
    position: fixed;
    width: 100%;
    max-width: 1440px;
    min-width: 320px;
    z-index: 1;
    height: 80px;
    text-align: center;
    background: rgba(164, 196, 181, 0.3);
    top: 0;
    -webkit-transition: top 0.5s;
    -moz-transition: top 0.5s;
    -ms-transition: top 0.5s;
    -o-transition: top 0.5s;
    transition: top 0.5s;
  }

  .app-header.hidden {
    top: -80px;
  }

  .header-inner {
    width: 95%;
    margin: auto;
    display: flex;
    display: -webkit-flex; /* Safari */
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
  }


  @media screen and (max-width: 768px) and (min-width: 480px) {
    .app-header {
      height: 60px;
    }
  }

  @media screen and (max-width: 480px) {
    .app-header {
      height: 40px;
    }
  }
</style>
