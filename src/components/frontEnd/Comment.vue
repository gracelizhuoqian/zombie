<template>
  <div class="comment">
    <h3>发表评论</h3>
    <inputComment @submitComment="handleSubmit"></inputComment>
      <div class="commentlist">
        <ul>
          <li class="commentItem" v-for="(item,index) in commentList" :key="item._id">
            <header>
              <span>{{item.user}}</span>
              <time>{{item.time}}</time>
            </header>
            <section>
              <p>{{item.content}}</p>
              <el-button plain v-show="isLogin" @click="showReply=true" size="mini">回复</el-button>
              <inputComment @submitComment="handleSubmit" v-show="showReply"></inputComment>
            </section>
            <div class="replylist" v-if="item.reply&&item.reply.length">
              <ul>
                <li v-for="(ritem,index) in item.reply" :key="'ritem'+index">
                  <header>
                    <p>{{ritem.from}} TO {{ritem.to}}</p>
                    <time>{{ritem.time}}</time>
                  </header>
                  <section>
                    <p>{{ritem.body}}</p>
                    <el-button plain v-show="isLogin" @click="showReply=true" size="mini">回复</el-button>
                    <inputComment @submitComment="handleSubmit" v-if="showReply"></inputComment>
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
  export default {
    name: "comment",
    data() {
      return {
        comment:{
          content:'',
          user:'路过一只小毛驴',
          time:'',
          article:'',
          reply:[]
        },
        props:['articleId'],
        isLogin:true,
        commentList:[{
          content:'我是一只粉刷匠',
          user:'路过一只小毛驴',
          time:'2018.8.8',
          article:'',
          reply:[]
        }],
        showReply:false,
      }
    },
    components:{inputComment},
    methods: {

      handleSubmit(comment){
        // let temp=this.convertEmoji(this.comment.content);
        // api.createComment(comment)
        //   .then((res)=>{
        //     if(res && res.code==200){
        //     }
        //   })
        // this.convertEmoji(temp);
        console.log(comment);
      },
      convertEmoji(content){
        let temp=content.replace(/\[([\w]+)\]/g,function(match,p){
          let src=`src/assets/img/emoji/${p}.gif`;
          return `<img src=${src}/>`;
        })
        return temp;
      },
    }
  }
</script>

<style scoped>
  .comment{
    font-weight: 100;
    text-align: left;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #eeeeee;
    box-shadow: 0 0 3px #7f8c8d;
    padding: 1rem 2rem;
    background: #ffffff;
  }
  .comment h3{
    font-weight: 100;
  }
</style>
