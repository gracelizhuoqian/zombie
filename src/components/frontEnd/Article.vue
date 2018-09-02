<template lang="html">
  <div class="paper">
    <article v-loading="loading2" element-loading-text="加载中" class="article_wrap article">
      <header>
        <div class="home_title">{{oneArticle.title}}</div>
        <div>
          <p class="home_creatAt"><img class="tag" src="../../assets/img/tag.png">{{oneArticle.classify+" "}}|
            {{time}}| zhuoqian</p>
        </div>
      </header>
      <section v-html="oneArticle.contentToMark" class="home_main"></section>
      <button class="return" @click="goback"><- RETURN</button>
    </article>
    <comment :articleId="$route.params.id"></comment>
  </div>
</template>

<script>
  import api from '../../api'
  import comment from './Comment'
  export default {
    data() {
      return {
        oneArticle: {},
        loading2: true,
        time:'',
      }
    },
    components:{comment},
    methods:{
      getArticle(){
        api.getOneArticleNoAuth({id: this.$route.params.id})
          .then(({data: {code, oneArticle}}) => {
            if (code == 200) {
              setTimeout(() => {
                this.loading2 = false
                this.oneArticle = oneArticle
                this.time=oneArticle.meta.updateAt
              }, 100)
              // tips 深层对象判空处理
            }
          })
      },
      goback: function () {
        this.$router.go(-1);
      }
    },
    created() {
      // 在这里调用获取一篇文章的api
      this.getArticle();
    },
    watch: {
      '$route': 'getArticle'
      // tips vue-router 针对params变更局部刷新，不用使用go强制刷新整个页面
    }
  }
</script>

<style lang="css" scoped>
  .wrapper .paper {
    background: rgba(228, 237, 218, 0.12);
  }

  article {
    background: #fff;
    width: 90%;
    margin: 3rem auto;
    color: #777;
    padding: 4rem 3rem 2rem 3rem;
    font-weight: 300;
    box-shadow: 0 2px 3px rgba(105, 123, 97, 0.73);
  }

  .home_title {
    font-size: 3rem;
    font-weight: 400;
    color: #666;
    padding: 1rem 0;

  }

  .home_creatAt {
    font-family: "Comic Sans MS", curslve, sans-serif;
    padding: 0.6rem 0;
    font-size: 1.8rem;
    color: #7f8c8d;
    /*background: red;*/
    margin: 0;
  }

  .home_main {
    font-size: 1.7rem;
    line-height: 1.7em;
    text-align: left;
    text-indent: 2rem;
  }

  .home_main p {
    text-indent: 2rem;
  }

  .paper .tag {
    display: inline-block;
    width: 12px;
    margin-right: 6px;
    opacity: 0.7;
  }

  .return {
    color: #7f8c8d;
    font-size: 1.6rem;
    font-family: "Comic Sans MS", curslve, sans-serif;
    border:none;
  }

  @media screen and (max-width: 786px) {
    article {
      width: 100%;
      margin: 0 auto;
      box-shadow: inset 1px 0 8px #aaaaaa, inset -1px 0 8px #aaaaaa;
    }

    .home_title {
      font-size: 2.2rem;
    }

    .home_creatAt {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 480px) {
    article {
      box-shadow: none;
      padding: 2rem 1rem;
      box-shadow: none;
    }

    .home_main {
      font-size: 1.4rem;
      line-height: 1.6em;
    }

    .home_title {
      font-size: 1.8rem;
    }

    .home_creatAt {
      font-size: 1.3rem;
    }
  }
</style>
