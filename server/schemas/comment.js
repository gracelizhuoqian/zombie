const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
  article:String, // 所属文章
  time:String,
  content:String,
  user:String,
  reply:[{ body: String, date: String, from:String, to:String}]
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
  },
  // 更新回复
  updateReply:function(commentId,r){
    return this.findOne({_id:commentId})
      .then((comment)=>{
        comment.reply.push(r);
        comment.save();
      })
  }
}
module.exports=commentSchema;
