const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  name:String,
  password:String,
});

userSchema.statics={
  //取出所有数据
  getUsers:function(){
    return this.find({});
  },
  getUserByName:function(n){
    return this.findOne({name:n});
  },
  createUser:function(u){
    return this.create(u);
  }
}
module.exports=userSchema;
