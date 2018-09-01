const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
  article:String, // 所属文章
  time:String,
  content:String,
  user:String,
  to:String,
  reply:Array
});

commentSchema.statics={
  createComment:function (data){
    return this.create(data);
  },
  // 删除
  removeComment:function (Id){
    return this.deleteOne({_id:Id});
  },
  getComment:function(articleId){
    return this.find({article:articleId});
  }
}
module.exports=commentSchema;
