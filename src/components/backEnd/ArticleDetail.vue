<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="article" :model="article" :rules="rules">
        <el-upload action="alert" :auto-upload="false" multiple :on-change="loadMarkDown"  v-if="showUpload">
          <el-button size="small" type="primary">Select a file</el-button>
        </el-upload>
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="article.classify" placeholder="请选择分类">
                <el-option v-for="item in classifyList" :label="item.classify" :value="item.classify"
                           :key="item._id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :push="0">
            <el-form-item label="摘要" label-width="40px" prop="abstartc">
              <el-input type="textarea" v-model="article.abstract" :rows="5" placeholder="输入文章摘要"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='12'>
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content">
              <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div
              style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;text-align:left;padding:10px 20px"
              v-html="markedToHtml" v-highlight></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 ">
          <el-button type="primary" style="float:right;" size='small' @click="update" :loading="load">
            {{btnText}}
          </el-button>
          <el-button style="float:right;margin-right:10px" size='small' @click="cancle" :loading="load">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import api from '../../api/index'
  import {renderToHtml} from '../../assets/js/mdloader'
  import NProgress from 'nprogress'
  import {sub} from '../../assets/js/classifySubmit'
  export default {
    name: 'articleDetail',
    data() {
      return {
        article: {
          classify: '',//文章所属分类
          title: '',//文章标题
          content: '',//文章内容
          abstract: '',// 摘要
        },
        classifyList: [],
        rules: {
          title: [
            {required: true, message: '请填写标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          classify: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ]
        },
        load: false,
        btnText: '立即发布',
        showUpload:false
      }
    },
    computed: {
      markedToHtml() {
        return renderToHtml(this.article.content);
      }
    },
    methods: {
      // 上传
      loadMarkDown(file, fileList) {
        if (file) {
          let uploadFile = file;
          this.article.title = /^([\u4e00-\u9fa5_a-zA-Z0-9]+)\.md/.exec(uploadFile.name)[1];
          let reader = new FileReader()
          reader.onload = async (e) => {
            try {
              this.article.content = e.target.result;
            } catch (err) {
              console.log(`load JSON document from file error: ${err.message}`);
            }
          }
          reader.readAsText(uploadFile.raw)
        }
      },
      initial() {
        this.listLoading = true
        NProgress.start();
        setTimeout(() => {
          NProgress.done();
          this.listLoading = false
          api.getOneArticle({id: this.$route.params.postId})
            .then(({data: {code, oneArticle: {_id, classify, title, content, abstract}}}) => {
              if (code == 200) {
                this.article.id = _id
                this.article.classify = classify
                this.article.title = title
                this.article.content = content
                this.article.abstract = abstract
              }
            })
        }, 100)

      },
      update() {
        this.$refs.article.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗?", "提示", {})
              .then(() => {
                NProgress.start()
                this.load = true;
                this.btnText = "发布中"
                // 发送的文章信息
                let apiName='';
                if(this.showUpload){
                  apiName='createArticle';
                }else{
                  apiName='editArticle'
                }
                api[apiName]({
                  contentToMark: this.markedToHtml,
                  ...this.article
                })
                  .then((res) => {
                    this.btnText = "立即发布";
                    this.editLoading = false;
                    sub(this,res)
                    setTimeout(() => {
                      this.$router.push({path: '/admin/articleList'})
                    }, 500)
                  })
              })
              .catch((error) => {
              })
          }
        })
      },
      // 取消
      cancle() {
        this.$router.push({path: '/admin/articleList'});
      }
    },
    mounted() {
      api.getClassify()
        .then(({data: {code, lists}}) => {
          if (code == 200) {
            this.classifyList = lists
          }
        })
        .catch(e => {
          console.log(e)
        });
      if(this.$route.params.postId){
        this.showUpload=false;
        this.initial();
      }else{
        this.showUpload=true;
      }
    },

  }
</script>

<style lang="css">

</style>
