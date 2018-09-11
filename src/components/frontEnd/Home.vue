<template lang="html">
  <div class="home">
    <div class="bg"><img src="http://oy1usp3kb.bkt.clouddn.com/background.jpg" alt="bg"></div>
    <h1>THE NEST OF SMALL ZOMBIE</h1>
    <p class="motto">This is my kindom. <br>If I don't fight for it, <br>who will?</p>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
    methods: {},
    mounted() {}
  }
</script>

<style lang="css" scoped>
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i');

  .home {
    background: rgba(228, 237, 218, 0.12);
  }
  .bg img{
    width: 100%;
  }
  h2, h4 {
    margin: 0;
  }

  .motto {
    font-size: 2rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif, 'Josefin Sans', sans-serif;
    line-height: 1.5;
    margin-top: 1rem;
  }
  .home_wrapper article {
    padding-bottom: 1rem;
    border-bottom: 1px solid #d2d2d2;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 786px) {

    h1 {
      font-size: 2.5rem;
    }

    .motto {
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 480px) {

    h1 {
      font-size: 2rem;
    }

    .motto {
      font-size: 1.5rem;
    }
  }
</style>
