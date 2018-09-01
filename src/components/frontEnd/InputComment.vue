<template>
    <div class="inputComment">
      <form ref="form">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="想说啥说啥"
          v-model="content">
        </el-input>
        <div :class="{'emoji-open':openEmoji}" class="emoji" >
          <div>
            <el-button size="small" @click="openEmoji=!openEmoji" type="success" plain>('w')表情</el-button>
            <el-button size="small" class="submit" @click="submit">发射</el-button>
          </div>
          <div class="emoji-body" v-if="openEmoji">
            <ul class="emoji-items">
              <li class="OwO-item" v-for="(oitem,index) in emojilist" :key="'oitem'+index" @click="choseEmoji(oitem.title)">
                <img :src="require(`../../assets/img/emoji/${oitem.url}`)">
                <!--tips 解决动态解析图片路径问题-->
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
  export default {
    name: "inputComment",
    data(){
      return {
        content:'',
        openEmoji:false,
        emojilist:[ { title: 'weixiao', url: 'weixiao.gif' },
          { title: 'xixi', url: 'xixi.gif' },
          { title: 'haha', url: 'haha.gif' },
          { title: 'keai', url: 'keai.gif' },
          { title: 'kelian', url: 'kelian.gif' },
          { title: 'wabi', url: 'wabi.gif' },
          { title: 'chijing', url: 'chijing.gif' },
          { title: 'haixiu', url: 'haixiu.gif' },
          { title: 'jiyan', url: 'jiyan.gif' },
          { title: 'bizui', url: 'bizui.gif' },
          { title: 'bishi', url: 'bishi.gif' },
          { title: 'aini', url: 'aini.gif' },
          { title: 'lei', url: 'lei.gif' },
          { title: 'touxiao', url: 'touxiao.gif' },
          { title: 'qinqin', url: 'qinqin.gif' },
          { title: 'shengbing', url: 'shengbing.gif' },
          { title: 'taikaixin', url: 'taikaixin.gif' },
          { title: 'baiyan', url: 'baiyan.gif' },
          { title: 'youhengheng', url: 'youhengheng.gif' },
          { title: 'zuohengheng', url: 'zuohengheng.gif' },
          { title: 'xu', url: 'xu.gif' },
          { title: 'shuai', url: 'shuai.gif' },
          { title: 'tu', url: 'tu.gif' },
          { title: 'haqian', url: 'haqian.gif' },
          { title: 'baobao', url: 'baobao.gif' },
          { title: 'nu', url: 'nu.gif' },
          { title: 'yiwen', url: 'yiwen.gif' },
          { title: 'chanzui', url: 'chanzui.gif' },
          { title: 'baibai', url: 'baibai.gif' },
          { title: 'sikao', url: 'sikao.gif' },
          { title: 'han', url: 'han.gif' },
          { title: 'kun', url: 'kun.gif' },
          { title: 'shui', url: 'shui.gif' },
          { title: 'qian', url: 'qian.gif' },
          { title: 'shiwang', url: 'shiwang.gif' },
          { title: 'ku', url: 'ku.gif' },
          { title: 'se', url: 'se.gif' },
          { title: 'heng', url: 'heng.gif' },
          { title: 'guzhang', url: 'guzhang.gif' },
          { title: 'yun', url: 'yun.gif' },
          { title: 'beishang', url: 'beishang.gif' },
          { title: 'zhuakuang', url: 'zhuakuang.gif' },
          { title: 'heixian', url: 'heixian.gif' },
          { title: 'yinxian', url: 'yinxian.gif' },
          { title: 'numa', url: 'numa.gif' },
          { title: 'hufen', url: 'hufen.gif' },
          { title: 'shudaizi', url: 'shudaizi.gif' },
          { title: 'fennu', url: 'fennu.gif' },
          { title: 'ganmao', url: 'ganmao.gif' },
          { title: 'xin', url: 'xin.gif' },
          { title: 'shangxin', url: 'shangxin.gif' },
          { title: 'zhu', url: 'zhu.gif' },
          { title: 'xiongmao', url: 'xiongmao.gif' },
          { title: 'tuzi', url: 'tuzi.gif' },
          { title: 'ok', url: 'ok.gif' },
          { title: 'ye', url: 'ye.gif' },
          { title: 'good', url: 'good.gif' },
          { title: 'no', url: 'no.gif' },
          { title: 'zan', url: 'zan.gif' },
          { title: 'lai', url: 'lai.gif' },
          { title: 'ruo', url: 'ruo.gif' },
          { title: 'caonima', url: 'caonima.gif' },
          { title: 'shenma', url: 'shenma.gif' },
          { title: 'jiong', url: 'jiong.gif' },
          { title: 'fuyun', url: 'fuyun.gif' },
          { title: 'geili', url: 'geili.gif' },
          { title: 'weiguan', url: 'weiguan.gif' },
          { title: 'weiwu', url: 'weiwu.gif' },
          { title: 'huatong', url: 'huatong.gif' },
          { title: 'lazhu', url: 'lazhu.gif' },
          { title: 'dangao', url: 'dangao.gif' },
          { title: 'fahongbao', url: 'fahongbao.gif' } ],
      }
    },
    methods:{
      submit(){
        this.$emit('submitComment',this.content);
      },
      choseEmoji(title){
        this.content+=`[${title}]`;
      },
    }
  }
</script>

<style scoped>
  .inputComment textarea{
    width: 100%;
    background:#f4f6f7;
    height:100px;
    border: 1px solid #8cb5a0;
  }
  .emoji{
    position: relative;
    margin-top: 5px;
  }
  .emoji-body{
    position: absolute;
    padding: 0 5px;
    background: #f0f9eb;
    box-shadow: inset 0 0 1px #87cd66;
  }
  .emoji-items{
    list-style: none;
    padding: 0;
  }
  .emoji-items li{
    display: inline-block;
    padding: 5px;
  }
</style>
