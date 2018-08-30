<template lang="html">
  <div class="wrapper">
    <vheader class="head" @touch-bottom="onBottom" @touch-up="onTop"></vheader>
    <transition name="slidemode">
      <router-view></router-view>
    </transition>
    <transition name="fade">
      <i class="el-icon-arrow-down" v-if="showArrow" @click="goNext"></i>
    </transition>
    <footer>
      <p>Copyrights © 2018 小丧尸 All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
  import vheader from './Header'

  export default {
    data() {
      return {
        loading2: false,
        showArrow: false
      }
    },
    methods: {
      onBottom: function () {
        if (this.$route.path == '/home') {
          this.showArrow = true;
        }
      },
      onTop: function () {
        this.showArrow = false;
      },
      goNext: function () {
        this.$router.push('articles');// 跳转到指定的子路由的地方，如果加上/就表示跟路由的基础上再push
        this.showArrow = false;
      }
    },
    components: {
      vheader,
    }
  }
</script>

<style lang="css" scoped>
  .wrapper {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    height: 100%;
  }

  .head {
    flex: 0 0 auto;
  }

  footer {
    height: 10rem;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    background: rgba(228, 237, 218, 0.12);
  }

  footer p {
    margin: auto;
    font-size: 1.5rem;
    color: #3d3d3d;
    padding: 1rem 1.5rem;
  }

  .el-icon-arrow-down {
    font-size: 35px;
    position: fixed;
    bottom: 70px;
    left: 0;
    right: 0;
    opacity: 0.9;
  }

  @keyframes upDown {
    0%, 40%, 80% {
      bottom: 70px;
      opacity: 0.5;
    }
    20%, 60%, 100% {
      bottom: 60px;
      opacity: 0.9;
    }
  }

  .fade-enter-active {
    -webkit-animation: upDown .8s;
    -o-animation: upDown .8s;
    animation: upDown .8s;
  }

  .fade-enter, .fade-leave-to {
    /*opacity: 0;*/
  }

  .slideleft-enter-active, .slideleft-leave-active, .slideright-enter-active, .slideright-leave-active {
    transition: all 1s;
  }

  .slideleft-enter, .slideleft-leave-to, .slideright-enter, .slideright-leave-to {
    opacity: 0;
  }

  .slideright-enter {
    transform: translateY(+100%);
  }

  .slideright-leave-active {
    transform: translateY(+100%);
  }

  .slideleft-enter {
    transform: translateY(-100%);
  }

  .slideleft-leave-active {
    transform: translateY(-100%);
  }

  @media screen and (max-width: 768px) {
    footer {
      height: 6rem;
    }

    footer p {
      font-size: 1.2rem;
      margin-bottom: .5rem;
    }
  }

  @media screen and (max-width: 480px) {
    .content {
      width: 100%;
      padding: 1rem 2rem;
    }
  }
</style>
