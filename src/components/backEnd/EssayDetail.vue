<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="essay" :model="essay" :rules="createRules" v-loading="listLoading">
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="随笔标题" label-width="90px" prop="title">
              <el-input v-model="essay.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="essay.classify" placeholder="请选择分类">
                <el-option v-for="item in classifyList" :label="item" :value="item" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='20' :push="1">
            <el-form-item label="图片链接" label-width="90px" prop="image">
              <el-input v-model="essay.image" style="width:710px" placeholder="请在此处输入图片链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span='20' :push="1">
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content">
              <el-input type="textarea" v-model="essay.content" :rows="15" placeholder="写点啥吧"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 ">
          <el-button type="primary" style="float:right;" size='small' @click="update" :loading="load">{{btnText}}
          </el-button>
          <el-button style="float:right;margin-right:10px" size='small' @click="cancle">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import api from '../../api/index'
  import NProgress from 'nprogress'
  import {sub} from '../../assets/js/classifySubmit'
  export default {
    data() {
      return {
        essay: {
          id: '',
          title: '',
          classify: '',
          content: '',
          image:'',
        },
        classifyList: ["Draw", "Travel", "Fiction", "Delicious", "Others"],
        createRules: {
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
        btnText: "立即更新",
        listLoading: false,
        isNew:true
      }
    },
    methods: {
      // 更新文章
      update() {
        this.$refs.essay.validate(valid => {
          if (valid) {

            this.$confirm("确认提交吗?", "提示", {})
              .then(() => {
                NProgress.start()
                this.load = true;
                // 换成真实API的时候可以直接提交this.article
                this.btnText = "更新中"
                let essayAction=this.isNew?'createEssay':'updateEssay'
                api[essayAction]({
                  ...this.essay
                })
                  .then((res) => {
                    this.btnText = "立即更新";
                    this.editLoading = false;

                    if (res.data) {
                      NProgress.done()
                      sub(this,res)
                      this.load=false
                    }
                  }).catch((err) => {
                  console.log(err);
                })
              })
              .catch((error) => {
                // 这里数据在换成真实api的时候要替换掉,直接用this.article
              })
          }
        })
      },
      initial() {
        this.listLoading = true
        NProgress.start();
        setTimeout(() => {
          NProgress.done();
          this.listLoading = false
          if(this.$route.params.postId){
            this.isNew=false;
            api.getOneEssay({id: this.$route.params.postId})
              .then(({data: {code, aEssay: {_id, classify, title, content,image}}}) => {
                if (code == 200) {
                  this.essay.id = _id
                  this.essay.classify = classify
                  this.essay.title = title
                  this.essay.content = content
                  this.essay.image = image
                }
              })
          }
        }, 500)

      },
      // 取消
      cancle() {
        this.$router.push({path: '/admin/essayList'});
      }
    },
    computed: {},
    mounted() {
      this.initial()
    }
  }
</script>

