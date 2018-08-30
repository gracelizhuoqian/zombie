const mongoose=require("mongoose");

const classifySchema=new mongoose.Schema({
  classify:String
});

classifySchema.statics={
  //  创建文章分类
  createClass:function (data){
    return this.create(data);
  },
  // 删除文章分类
  removeClass:function (classId){
    return this.deleteOne({_id:classId});
  },
  // 编辑文章分类
  updateClass:function (classId,data){
    return this.updateOne({_id:classId},{$set:data});
  },
  getAllClass:function(){
    return this.find({});
  }
}
module.exports=classifySchema;
