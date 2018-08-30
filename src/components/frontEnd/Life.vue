<template lang="html">
  <div class="maindiv">
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="caption">
        <p>Drops of Happiness in My Life</p>
        <p class="motto">keeps great and small<br>on the endless round.<br>It's the circle of life.</p>
      </div>
      <ul>
        <template v-for="(item,index) in totalClass">
          <li><a class="tag_btn" :to="`/tags/${index}`" @click.prevent="getData(item,index)"
                 :class="{'active':index==selected}">{{item}}</a>
          </li>
        </template>
      </ul>
      <div class="boxpanel">
        <div class="photobox" v-for="essay in essayLists" :key='essay._id'>
          <div class="imageshow" :title='essay.title' :content='essay.content'>
            <img :src="essay.image">
          </div>
        </div>
        <footer class='loadMore' v-if="loadMoreShow">
          <el-button type="primary" :loading="loadMoreFlag" @click='loadMore'>{{loadMoreText}}</el-button>
        </footer>
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
        essayLists: [],
        selected: 2,
        classify: "Travel",
        list_show: true,
        loading2: true,
        loadMoreFlag: false,
        loadMoreText: '加载更多',
        loadMoreShow: false,
        page: 1,
        limit: 4,
        articleClass: [],
        totalClass: ["Draw", "Travel", "Fiction", "Delicious", "Others"],
      }
    },
    methods: {
      loadMore() {
        this.loadMoreText = '加载中'
        this.loadMoreFlag = true
        this.page++
        this.loadData(this.page, this.limit, this.classify)
      },
      loadData(page, limit, classify) {
        api.getEssayPart({page, limit, classify})
          .then(({data: {code, essaylist, hasNext, hasPrev}}) => {
            if (code == 200) {
              setTimeout(() => {
                this.essayLists = this.essayLists.concat(essaylist);
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
      getData(classify, index) {
        this.selected = index;
        this.page = 1;
        this.essayLists=[];
        this.loadData(1,this.limit,classify);
      }
    },
    mounted() {
      // 封装成一个方法，与分页获取文章列表类似
      this.loadData(1, this.limit, this.classify)
    }

  }

</script>

<style scoped>

  * {
    box-sizing: border-box;
  }

  .maindiv .app-content {
    width: 100%;
    padding-top: 0;
  }

  .maindiv .app-content .caption {
    margin: 5rem auto;
    margin-top: 6rem;
    font-size: 3rem;
  }

  .maindiv .app-content .caption .motto {
    font-size: 1.8rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif, 'Josefin Sans', sans-serif;
  }

  .maindiv .app-content ul {
    display: inline-block;
    list-style: none;
    width: 100%;
    padding: 0;
  }

  .maindiv .app-content li {
    display: inline-block;
    list-style: none;
    color: #666;
    width: 20%;
    font-size: 2rem;
    border-bottom: 1px solid rgba(172, 172, 172, 0.49);
    padding-bottom: 8px;
    text-shadow: 0 .5px .5px #666;
    cursor: pointer;
  }

  .maindiv .app-content li a {
    color: #666;
  }

  .maindiv .app-content li a:hover {
    color: rgb(157, 193, 160);
  }

  .maindiv .app-content .boxpanel {
    width: 100%;
  }

  .maindiv .app-content .boxpanel .photobox {
    width: 70%;
    box-shadow: 0 0 5px #666;
    margin: 1rem auto;
    margin-bottom: 4rem;
  }

  .maindiv .boxpanel .photobox .imageshow {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .maindiv .boxpanel .photobox .imageshow img {
    width: 100%;
  }

  .imageshow::before {
    content: attr(title);
    position: absolute;
    top: -50%;
    left: 0;
    width: 100%;
    height: 50%;
    /*  padding: 10px;*/
    font-family: 'Croissant One', cursive;
    font-size: 3rem;
    font-weight: 600;
    line-height: 5;
    color: #666;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .imageshow::after {
    content: attr(content);
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 50%;
    /*  padding: 10px;*/
    font-family: 'Poiret One', cursive;
    font-size: 2rem;
    font-weight: 400;
    line-height: 3;
    color: #eee;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    text-indent: 2rem;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .imageshow:hover::before {
    top: 0;
  }

  .imageshow:hover::after {
    bottom: 0;
  }
  .imageshow{
    font-size: 0;
  }
  /*tips div中嵌套图片因为存在，图片是inline元素，其vertical-align的默认值是baseline，后面的空白部分被当成空格字符而产生留白，可以将
  图片的display:block，或者verticle-align：center；或者父级元素font-size:0*/
  .loadMore {
    margin: 4rem 0 0 0;
    display: flex;
    display: webkit-flex;
  }

  .loadMore button {
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

  @media screen and (max-width: 768px) and (min-width: 480px) {
    .maindiv .app-content .caption {
      margin: 4rem auto;
      margin-top: 5rem;
      font-size: 2.5rem;
    }

    .maindiv .app-content .caption .motto {
      font-size: 1.6rem;
    }

    .maindiv .app-content li a {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 480px) {
    .maindiv .app-content .caption {
      margin: 3rem auto;
      margin-top: 4rem;
      font-size: 2rem;
    }

    .maindiv .app-content .caption .motto {
      font-size: 1.4rem;
    }

    .maindiv .app-content ul {
      margin: 0;
    }

    .maindiv .app-content li a {
      font-size: 1.4rem;
    }
  }
</style>
