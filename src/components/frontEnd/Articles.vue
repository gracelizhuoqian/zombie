<template>
  <div class="maindiv">
    <div class=" app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <div class="sidebar">
        <div class="tags">
          <h2>TAGS</h2>
          <a href="#" class="size1">JavaScript</a>
          <a href="#" class="size2">CSS</a>
          <a href="#" class="size3">flex</a>
          <a href="#" class="size1">HTML</a>
          <a href="#" class="size2">Canvas</a>
          <a href="#" class="size2">HTML5</a>
          <a href="#" class="size3">nodeJS</a>
          <a href="#" class="size2">jQuery</a>
          <a href="#" class="size2">ECharts</a>
        </div>
        <div class="articlemenu">
          <ul>
            <template v-for="(item,index) in articleClass">
              <li><a class="tag_btn" :to="`/tags/${item._id}`" @click.prevent="gets(index,item.classify)"
                     :class="{'active':index==selected}">{{item.classify}}</a>
              </li>
            </template>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="main">
        <div v-loading="loading2" element-loading-text="加载中">
          <article class="essay" v-for='item in items' :key="item._id">
            <header>
              <div>
                <router-link :to="{path:`/article/${item._id}`}">
                  <h2>{{item.title}}</h2>
                </router-link>
                <h3><img class="tag" src="../../assets/img/tag.png">{{item.classify+" "}}|{{""+
                  item.meta.updateAt}}| zhuoqian</h3>
                <div class="content">
                  <section v-html="item.abstract"></section>
                </div>
              </div>
            </header>
            <footer>
              <router-link class="readmore" :to="{path:`/article/${item._id}`}"><a href="#">READ MORE</a></router-link>
            </footer>
          </article>
          <footer class='loadMore' v-if="loadMoreShow">
            <el-button type="primary" :loading="loadMoreFlag" @click='loadMore'>{{loadMoreText}}</el-button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api'

  export default {
    data: function () {
      return {
        items: [],
        selected: "请选择文章类型>>",
        list_show: true,
        loading2: true,
        loadMoreFlag: false,
        loadMoreText: '加载更多',
        loadMoreShow: false,
        page: 1,
        limit: 5,
        articleClass: [],
        actionType:1
      }
    },
    computed:{
      getActionType:function(){
        return this.actionType===1?'getArticleLists':'getArticlesByClassify';
      }
    },
    methods: {
      loadMore() {
        this.loadMoreText = '加载中';
        this.loadMoreFlag = true;
        this.page++;
        this.loadData(this.page, this.limit, this.selected);
      },
      loadData(page, limit, classify) {
        api[this.getActionType]({page, limit, classify})
          .then(({data: {code, articleLists, hasNext, hasPrev}}) => {
            if (code == 200) {
              setTimeout(() => {
                this.items = this.items.concat(articleLists)
                this.loading2 = false;
                if (hasNext) {
                  this.loadMoreShow = true
                  this.loadMoreFlag = false
                  this.loadMoreText = '加载更多'
                } else {
                  this.loadMoreShow = false
                }
              }, 200)
            }
          })
      },
      gets(index, classify) {
        if (index == -1) {
          this.selected = classify;
        } else {
          this.selected = index;
        }
        this.actionType=2;
        this.page=1;
        this.items=[];
        this.loadData(this.page,this.limit,classify);
      }
    },
    mounted() {
      this.loadData(1,this.limit)
      api.getNoAuthClass()
        .then(({data:{code,lists}})=>{
          if(code==200){
            setTimeout(()=>{
              this.loading2=false;
              this.articleClass=lists
            },200)
          }
        })
        .catch(err=>{
          alert(err.message);
        })
    }
    // tips 简化代码，利用计算属性保存当前查询状态，根据不同状态查询不同api，每次触发分类选择时清空数据
  }

</script>

<style>
  * {
    box-sizing: border-box;
  }

  .maindiv {
    width: 100%;
    background-color: rgba(228, 237, 218, 0.12);
  }

  .maindiv .app-content {
    width: 90%;
    margin: 0 auto;
    padding-top: 1.5rem;
  }

  .maindiv .sidebar {
    float: right;
    width: 32%;
  }

  .maindiv .sidebar .articlemenu {
    background-color: #fff;
    margin-bottom: 1rem;
    box-shadow: 0 0 2px rgba(170, 170, 170, 0.8);
  }

  .maindiv .sidebar .articlemenu select {
    display: none;
  }

  .maindiv .sidebar .articlemenu ul {
    list-style-type: none;
    padding: 0;
  }

  .maindiv .sidebar .articlemenu ul li {
    display: block;
    padding: 1rem;
    border-top: 1px solid #dddddd;
    font-size: 1.4rem;
    border-left: 3px solid #b1ccb6;
  }

  .maindiv .sidebar .articlemenu ul li:hover {
    background-color: rgba(230, 230, 230, 0.75);
    border-left: 3px solid #8fa88c;
  }

  .maindiv .sidebar .articlemenu ul li a {
    text-decoration: none;
    color: #717171;
    cursor: grab;
  }

  .maindiv .tags {
    margin-top: 1rem;
    background-color: #fff;
    padding: 0.5rem 1.2rem 1.5rem 1.2rem;
    box-shadow: 0 0 2px rgba(170, 170, 170, 0.8);
  }

  .maindiv .tags h2 {
    color: #aaaaaa;
    margin: 0;
    font-size: 3rem;
    margin: 1rem;
    font-weight: normal;
  }

  .maindiv .tags a {
    text-decoration: none;
    color: #869d8d;
    display: inline-block;
  }

  .maindiv .tags a.size1 {
    font-size: 2rem;
  }

  .maindiv .container .tags a.size2 {
    font-size: 1.6rem;
  }

  .maindiv .container .tags a.size3 {
    font-size: 1.2rem;
  }

  .maindiv .app-content .main {
    padding-right: 33%;

  }

  .maindiv .app-content .main .essay {
    background-color: rgba(177, 204, 182, 0.2);
    padding: 2rem 0 1rem 0;
    margin: 1rem 0;
    box-shadow: 0 2px 2px rgb(177, 204, 182);
  }

  .maindiv .app-content .main .essay h2 {
    color: #6e866e;
    font-family: "LiHei Pro";
    font-weight: normal;
    margin: 0;
    font-size: 1.8rem;
  }

  .maindiv .app-content .main .essay h3 {
    color: #999999;
    margin: 2px;
    font-size: 1.3rem;
    font-weight: 400;
    font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .maindiv .app-content .main .essay .tag {
    width: 11px;
    margin-right: 6px;
    opacity: 0.7;
  }

  .maindiv .app-content .main .essay .content {
    color: #717171;
    margin: 5px 0;
    height: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    padding: 0 3rem;
    text-indent: 2rem;
  }

  .maindiv .app-content .main .essay p {
    font-size: 1.4rem;
  }

  .maindiv .app-content .main .essay .readmore a {
    font-size: 1.3rem;
    color: #8cb5a0;
  }

  .loadMore {
    margin: 4rem 0 0 0;
    display: flex;
    display: webkit-flex;
  }

  .loadMore button.el-button {
    cursor: pointer;
    outline: none;
    padding: 1rem;
    margin: auto;
    border-radius: .5rem;
    color: #666;
    background-color: rgba(176, 209, 183, 0.33);
    border: 0;
    box-shadow: 1px 1px 1px #6e766f;
  }

  .loadMore button.el-button:hover {
    background-color: rgba(176, 209, 183, 0.5);
  }

  .loadMore button.el-button:active {
    background-color: rgba(176, 209, 183, 0.5);
  }

  @media only screen and (min-width: 1024px) {
    body {
      font-size: 1.4rem;
    }

    .maindiv .app-content .sidebar .search {
      padding: 1.5rem;
    }

    .maindiv .app-content .sidebar .menu ul li {
      font-size: 1.5rem;
    }

    .maindiv .app-content .tags {
      padding: 1rem 1.2rem 1.5rem 1.2rem;
    }

    .maindiv .app-content .tags h2 {
      color: #999999;
      font-size: 1.6rem;
    }

    .maindiv .app-content .tags a {
      padding: 2px;
    }

    .maindiv .app-content .tags a.size1 {
      font-size: 2.2rem;
    }

    .maindiv .app-content .tags a.size2 {
      font-size: 1.8rem;
    }

    .maindiv .app-content .tags a.size3 {
      font-size: 1.4rem;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    body {
      font-size: 1.3rem;
    }

    .maindiv .app-content {
      width: 95%;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 480px) {
    .maindiv .app-content {
      width: 100%;
      padding-top: 45px;
      background-color: rgba(224, 234, 222, 0.1);
    }

    .maindiv .sidebar {
      float: none;
      width: 100%;
      margin: 0;
    }

    .maindiv .sidebar .articlemenu {
      background-color: rgb(145, 170, 140);
      margin: 0;
      box-shadow: 0 0 2px rgba(145, 170, 140, 0.8);
    }

    .maindiv .sidebar .articlemenu ul li {
      display: inline-block;
      padding: 1rem;
      border: none;
      font-size: 1.4rem;
    }

    .maindiv .sidebar .articlemenu ul li:hover {
      background-color: rgba(230, 230, 230, 0.25);
      border-left: none;
    }

    .maindiv .sidebar .articlemenu ul li a {
      text-decoration: none;
      color: #eeeeee;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .maindiv .sidebar .tags {
      display: none;
    }

    .maindiv .app-content .main {
      padding-right: 0;
    }

    .maindiv .app-content .main .essay h3 {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }

    .maindiv .app-content .main .essay {
      background-color: transparent;
      padding: 10px;
    }

    .maindiv .app-content .main .essay .content {
      margin-top: 0;
      padding: 0 2rem;
      text-indent: 2rem;
      text-align: left;
      height: 70px;
    }

    .maindiv .app-content .main .essay .content p {
      line-height: 1.5;
      font-size: 13px;
    }

    .maindiv .app-content .main .essay .tag {
      width: 10px;
      margin-right: 5px;
    }

    .maindiv .app-content .main .essay h2 {
      font-size: 1.8rem;
    }

    .loadMore {
      margin: 2rem 0 0 0;
      font-size: 1rem;
    }

    .loadMore button.el-button {
      padding: 8px;
    }
  }

  @media only screen and (max-width: 479px) {
    .maindiv .app-content {
      width: 100%;
      padding-top: 0;
    }

    .maindiv .app-content .sidebar {
      display: block;
      width: 100%;
    }

    .maindiv .sidebar .articlemenu ul {
      display: none;
    }

    .maindiv .sidebar .articlemenu select {
      display: block;
      margin-top: 40px;
      width: 100%;
      background-color: #8fa88c;
      height: 30px;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      font-family: Sathu;
      font-size: 1.4rem;
      color: #efefef;
    }

    .maindiv .sidebar .articlemenu option {
      text-align: center;
      display: inline-block;
    }

    .maindiv .sidebar .articlemenu select:focus {
      outline: none;
    }

    .maindiv .app-content .tags {
      display: none;
    }

    .maindiv .app-content .main {
      padding-right: 0;
      padding-top: 5px;
    }

    .maindiv .app-content .main .essay {
      background-color: #fff;
      padding: 1rem 0;
      padding-bottom: 1rem;
      margin: 0px;
    }

    .maindiv .app-content .main .essay:nth-of-type(n+2) {
      border-top: 1px silver dashed;
    }

    .maindiv .app-content .main .essay .content {
      color: #717171;
      margin: 0 0 5px 0;
      height: 80px;
      padding: 0 2rem;
    }

    .maindiv .app-content .main .essay p {
      font-size: 1.2rem;
    }

    .loadMore {
      margin: 1rem 0 0 0;
    }

    .loadMore button.el-button {
      padding: .8rem;
      font-size: 1.2rem;
    }
  }

  @media only screen and (max-width: 320px) {
    body {
      min-width: 320px;
    }

  }
</style>
