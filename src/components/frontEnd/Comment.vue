<template>
  <div class="comment">
    <h4>发表评论</h4>
    <inputComment @submitComment="handleComment"></inputComment>
    <div class="commentlist">
      <div class="commentHead">
        <span class="totalCount">('0') 围观{{commentList.length}}只</span>
        <span v-show="!isLogin">前往<a class="toLogin" @click="toLogin">登录</a>参与回复</span>
      </div>
      <ul>
        <li class="commentItem" v-for="(item,index) in commentList" :key="item._id">
          <header>
            <p class="user-name">{{item.user}}</p>
            <time class="time">{{item.time}}</time>
          </header>
          <section>
            <p v-html="convertEmoji(item.content)"></p>
            <div class="replybutton">
              <el-button plain v-if="isLogin" @click="replyMsg(index)" size="mini">回复</el-button>
              <el-button plain v-if="index==selected" @click="selected=-1" size="mini">取消</el-button>
            </div>
            <inputComment @submitComment="handleReply(item,$event)" v-if="index==selected"></inputComment>
          </section>
          <div class="replylist" v-if="item.reply&&item.reply.length">
            <ul>
              <li v-for="(ritem,rindex) in item.reply" :key="'ritem'+rindex">
                <header>
                  <span class="user-name">{{ritem.from}}</span> to
                    <span class="user-name">{{ritem.to}}</span>
                  <time class="time">{{ritem.date}}</time>
                </header>
                <section>
                  <p v-html="convertEmoji(ritem.body)"></p>
                  <el-button plain v-if="isLogin" @click="replyReply(ritem,rindex)" size="mini">回复</el-button>
                  <el-button plain v-if="rindex==replySelected" @click="replySelected=-1" size="mini">取消</el-button>
                  <inputComment @submitComment="handleRereply(item,ritem.from,$event)"
                                v-if="rindex==replySelected"></inputComment>
                </section>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index'
  import inputComment from './InputComment'
  import moment from 'moment'
  import storage from '../../assets/js/cookieStorage'

  export default {
    name: "comment",
    props: ['articleId'],
    data() {
      return {
        comment: {
          content: '',
          user: '路过一只小毛驴',
          time: '',
          article: '',
          reply: []
        },
        props: ['articleId'],
        isLogin: true,
        commentList: [],
        showReply: false,
        selected: -1,
        replySelected:-1
      }
    },
    components: {inputComment},
    methods: {
      toLogin() {
        storage.setItem('logUrl', this.$route.fullPath);
        this.$router.push({path: '/login'});
      },
      replyMsg(index) {
        this.selected = index;
      },
      replyReply(ritem,rindex){
        this.replySelected=rindex;
      },
      handleComment(content) {
        let user = this.$store.state.name;
        api.createComment({
          content: content,
          user,
          time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
          article: this.comment.article,
          reply: []
        })
          .then(({data}) => {
            if (data && data.code == 200) {
              this.commentList.unshift(data.comment);
              this.comment.content = '';
              this.$notify({
                title: '成功',
                message: '发射成功',
                type: 'success'
              })
            }
          })
      },
      handleReply(e, reply) {
        let from = this.$store.state.name,
          to = e.user,
          body = reply,
          date = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        api.addReply({
          id: e._id,
          from,
          to,
          body,
          date
        })
          .then(({data}) => {
            e.reply.push({from, to, body, date});
            this.selected=-1;
          })
          .catch(e => {
            console.log(e);
          })
      },
      // tips解决在处理函数中传参问题，第一个参数是要传的，第二个是$event来自子组件的参数
      // tips 子组件每个都是独立的，可以绑定不同的处理函数,因此父组件的处理函数可以不同
      handleRereply(comment,to,body){
        let date=moment().format('YYYY-MM-DD HH:mm:ss').toString(),
          from=this.$store.state.name,
          id=comment._id;
        api.addReply({
          id,from,to,body,date
        })
          .then(({data})=>{
            comment.reply.push({from,to,body,date});
            this.replySelected=-1;
        })
        .catch(e=>{
          console.log(e);
        })
      },
      convertEmoji(content) {
        let temp = content.replace(/\[([\w]+)\]/g, function (match, p) {
          let src = `../static/img/emoji/${p}.gif`;
          // tips 解决动态引入图片路径问题
          return `<img src=${src} />`;
        })
        return temp;
      },

    },
    mounted() {
      let articleId = this.$route.params.id;
      api.getComment({id: articleId})
        .then(({data}) => {
          if (data.code == 200) {
            this.commentList = data.lists;
          }
        })
      this.comment.article = articleId;
      this.isLogin = Boolean(this.$store.state.token);
    }
    // tips 数据库的设计和数据的更新要注意，以及深层嵌套时候函数的参数传递
  }
</script>

<style scoped>
  .comment {
    font-weight: 100;
    font-size: 14px;
    text-align: left;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #eeeeee;
    box-shadow: 0 0 3px #7f8c8d;
    padding: 0 2rem;
    background: #ffffff;
  }

  .comment h4 {
    font-weight: 300;
  }

  .commentlist ul {
    list-style-type: none;
    padding: 0;
  }

  .totalCount {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 2rem;
  }

  .commentHead {
    line-height: 1.5;
    margin-top: 3rem;
  }

  .replybutton {
    margin-bottom: 5px;
  }

  .user-name {
    font-size: 14px;
    margin: 5px 0;
    color: #444;
    font-weight: bold;
    display: inline-block;
  }

  .time {
    color: #aaa;
    font-size: 12px;
    margin-left: 10px;
  }

  .commentItem {
    border-top: 1px solid #d3dce6;
    padding: 2rem 0;
    line-height: 1;
  }

  .toLogin {
    font-weight: bold;
    color: #686868;
  }
  .replylist{
    margin-left: 10%;
  }
  .replylist li{
    border-top: 1px solid #d3dce6;
    margin: 1rem;
  }
  .replylist header{
    padding-top: 1rem;
  }
  @media screen and (max-width: 786px) {
    .comment {
      width: 100%;
    }
  }

</style>
