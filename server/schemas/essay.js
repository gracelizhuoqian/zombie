const mongoose = require("mongoose");

const essaySchema = new mongoose.Schema({
  title: String,
  classify: String,
  content: String,
  image: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }// 录入时间记录
});
// 每次在存储数据前都会调用该方法
essaySchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});
essaySchema.statics = {
  // 按时间获取所有随笔
  getEssayByTime: function (page, limit) {
    let s = (page - 1) * limit;
    return Promise.all([this.find({}).skip(s).limit(limit).sort("meta.updateAt"),
      this.countDocuments({})]);
  },
  // 获取某类型随笔
  getEssayByClass: function (page, limit,c) {
    let s = (page - 1) * limit;
    return Promise.all([this.find({classify: c}).skip(s).limit(limit).sort("meta.updateAt"),
      this.countDocuments({classify: c})]);
  },
  // tips 注意参数顺序，如果不是解构赋值的话
  // 获取某一篇文章
  getOneEssay: function (id) {
    return this.findOne({_id: id});
  },
  // 创建文章
  createEssay: function (params) {
    return this.create(params);
  },
  // 删除
  deleteEssay: function (id) {
    return this.deleteOne({_id: id});
  },
  // 更新
  updateEssay: function (id, data) {
    return this.updateOne({_id: id}, {$set: data});
  }
}
module.exports = essaySchema;
