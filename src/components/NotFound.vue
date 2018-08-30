<template lang="html">
    <div class="NotFound">
      <div class="wrap">
        <h1>哎呀,您走远了 !</h1>
        <p><a @click="goHome" href="javascript:;">请重回主页</a></p>
      </div>

    </div>
</template>

<script>
export default {
  methods:{
    goHome(){
      this.$router.replace({path:'/home'});
    }
  }
}
</script>

<style lang="css" scoped>
  h1,p{
    margin:0;
  }
  .NotFound{
    display: flex;
    height: 100%;
    background:#0A7189;
    color:#fff;
    padding: 1rem;
  }
  .wrap{
    margin:auto;
    text-align: center;
  }
  .wrap h1{
    font-size:5rem;
    font-weight: 500;
  }
  .wrap p{

    margin-top: 4rem;
  }
  .wrap p a{
    display: block;
    color:#fff;
    text-decoration: underline;
    font-size: 2rem;
  }
  .wrap p a:hover{
    opacity: 0.8;
  }
</style>
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Load from File</el-button>
    <el-dialog title="Load JSON document from file" :visible.sync="dialogVisible">
      <el-upload :file-list="uploadFiles" action="alert" :auto-upload="false" multiple :on-change="loadJsonFromFile">
        <el-button size="small" type="primary">Select a file</el-button>
        <div slot="tip">upload only jpg/png files, and less than 500kb</div>
      </el-upload>
      <span slot="footer">
      <el-button type="primary" @click="dialogVisible = false">cancel</el-button>
      <el-button type="primary" @click="loadJsonFromFileConfirmed">confirm</el-button>
    </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        // data for upload files
        uploadFilename: null,
        uploadFiles: [],
        dialogVisible: false
      }
    },
    methods: {
      loadJsonFromFile (file, fileList) {
        this.uploadFilename = file.name
        this.uploadFiles = fileList
      },
      loadJsonFromFileConfirmed () {
        console.log(this.uploadFiles)
        if (this.uploadFiles) {
          for (let i = 0; i < this.uploadFiles.length; i++) {
            let file = this.uploadFiles[i]
            console.log(file.raw)
            if (!file) continue
            let reader = new FileReader()
            reader.onload = async (e) => {
              try {
                let document = JSON.parse(e.target.result)
                console.log(document)
              } catch (err) {
                console.log(`load JSON document from file error: ${err.message}`)
                this.showSnackbar(`Load JSON document from file error: ${err.message}`, 4000)
              }
            }
            reader.readAsText(file.raw)
          }
        }
        this.dialogVisible = false
      }
    }
  }
</script>

